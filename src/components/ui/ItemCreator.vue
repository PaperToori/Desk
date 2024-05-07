<script setup>
import { watch, ref } from 'vue';
import { useAdminStore } from '@/stores/store';

const props = defineProps({ tags: Array, students: Array });

let adminStore = useAdminStore();
let responseMessage = ref('No Status');
let tagCount = ref(0);
let studentCount = ref(0);

let studentName = ref();
let studentSocialSecurityNumber = ref();
let studentEmail = ref();
let studentPhoneNumber = ref();
let studentAdress = ref();
let studentZip = ref();
let studentCity = ref();
let studentGuardian = ref();
let tempPassword = ref();
let studentGroup = ref();

watch(() => adminStore.selected, () => {
    // Reset text boxes and status display
    document.getElementById('teacher-name').value = '';
    document.getElementById('teacher-gmail').value = '';
    document.getElementById('teacher-phonenumber').value = '';
    document.getElementById('classroom-name').value = '';
    document.getElementById('subject-name').value = '';
    document.getElementById('tag-name').value = '';
    document.getElementById('status-message').style.backgroundColor = 'rgb(180, 180, 180)';
    responseMessage.value = 'No Status';
    tagCount.value = 0;
    studentCount.value = 0;
    // Hide all options
    document.getElementById('input-teacher').style.display = 'none';
    document.getElementById('input-student').style.display = 'none';
    document.getElementById('input-group').style.display = 'none';
    document.getElementById('input-classroom').style.display = 'none';
    document.getElementById('input-subject').style.display = 'none';
    document.getElementById('input-tag').style.display = 'none';

    // Display the selected option
    if (adminStore.selected === 'teacher') {
        document.getElementById('input-teacher').style.display = 'inline';
    } else if (adminStore.selected === 'student') {
        document.getElementById('input-student').style.display = 'grid';
    } else if (adminStore.selected === 'group') {
        document.getElementById('input-group').style.display = 'grid';
    } else if (adminStore.selected === 'classroom') {
        document.getElementById('input-classroom').style.display = 'inline';
    } else if (adminStore.selected === 'subject') {
        document.getElementById('input-subject').style.display = 'inline';
    } else if (adminStore.selected === 'tag') {
        document.getElementById('input-tag').style.display = 'inline';
    }
});

async function PutRequest() { // Student functionality is currently fucked

    let response;

    // /// Create new Teacher
    if (adminStore.selected === 'teacher') {
        // Init values for ease of use
        let teacherName = document.getElementById('teacher-name').value;
        let teacherGmail = document.getElementById('teacher-gmail').value;
        let teacherPhoneNumber = document.getElementById('teacher-phonenumber').value;

        // Attempt POST request
        try {
            response = await fetch("http://localhost:8080/teachers/", {
                method: "POST",
                body: JSON.stringify({
                    name: teacherName,
                    gmail: teacherGmail,
                    phoneNumber: teacherPhoneNumber
                })
            });
        } catch (error) {
            console.log(error.message);
        }
    }
    // /// Create new Student
    else if (adminStore.selected === 'student') {
        // Init values for ease of use
        let studentTags = [...getAllStudentTags()];

        // Attempt POST request
        try {
            response = await fetch("http://localhost:8080/students/", {
                method: "POST",
                body: JSON.stringify({
                    name: studentName.value,
                    email: studentEmail.value,
                    phoneNumber: studentPhoneNumber.value,
                    tags: studentTags.value,
                    socialSecurityNumber: studentSocialSecurityNumber.value,
                    adress: studentAdress.value,
                    zip: studentZip.value,
                    city: studentCity.value,
                    guardian: studentGuardian.value,
                    tempPassword: tempPassword.value,
                    group: studentGroup.value,
                })
            });
        } catch (error) {
            console.log(error.message);
        }
    }
    // /// Create New Group... this is gonna be a massive pain
    else if (adminStore.selected === 'group') {
        // Init values for ease of use
        let groupName = document.getElementById('group-name').value;
        let groupMembers = getAllGroupMembers();

        // Attempt POST request
        try {
            response = await fetch("http://localhost:8080/groups/", {
                method: "POST",
                body: JSON.stringify({
                    name: groupName,
                    members: groupMembers
                })
            });
        } catch (error) {
            console.log(error.message);
        }
    }
    // /// Create new Classroom 
    else if (adminStore.selected === 'classroom') {
        // Init values for ease of use
        let classroomName = document.getElementById('classroom-name').value;

        // Attempt POST request
        try {
            response = await fetch("http://localhost:8080/classrooms/", {
                method: "POST",
                body: JSON.stringify({ name: classroomName })
            });
        } catch (error) {
            console.log(error.message);
        }
    }
    // /// Create new Subject
    else if (adminStore.selected === 'subject') {
        // Init values for ease of use
        let subjectName = document.getElementById('subject-name').value;

        // Attempt POST request
        try {
            response = await fetch("http://localhost:8080/subjects/", {
                method: "POST",
                body: JSON.stringify({ name: subjectName })
            });
        } catch (error) {
            console.log(error.message);
        }
    }
    // /// Create new Tag
    else if (adminStore.selected === 'tag') {
        // Init values for ease of use
        let tagName = document.getElementById('tag-name').value;

        // Attempt POST request
        try {
            response = await fetch("http://localhost:8080/tags/", {
                method: "POST",
                body: JSON.stringify({ name: tagName })
            });
        } catch (error) {
            console.log(error.message);
        }
    }
    responseMessage.value = await response.text();
    if (response.status === 200) {
        document.getElementById('status-message').style.backgroundColor = "rgb(100, 180, 100)";
    } else { document.getElementById('status-message').style.backgroundColor = "rgb(210, 110, 110)"; }
}

function DecrimentTagCount() { if (tagCount.value > 0) { tagCount.value--; } }
function DecrimentStudentCount() { if (studentCount.value > 0) { studentCount.value--; } }

function getAllStudentTags() {
    let selectedTags = [];
    let tagSelectors = document.querySelectorAll(".student-list-tags");
    Array.from(tagSelectors).forEach((tagSelector) => {
        selectedTags.push(tagSelector.value);
    });
    return selectedTags;
}

function getAllGroupMembers() {
    let selectedStudents = [];
    let memberSelectors = document.querySelectorAll(".group-list-students");
    Array.from(memberSelectors).forEach((memberSelector) => {
        selectedStudents.push(memberSelector.value);
    });
    return selectedStudents;
}

</script>

<template>
    <div id="input-teacher">
        <input id="teacher-name" type="text" placeholder="Full Name">
        <input id="teacher-gmail" type="text" placeholder="Gmail">
        <input id="teacher-phonenumber" type="tel" inputmode="numeric" placeholder="Phone Number">
    </div>
    <div id="input-student">
        <div>
            <h3>Personuppgifter</h3>
            <input type="text" placeholder="Förnamn Efternamn" v-model="studentName">
            <input type="text" placeholder="Personnummer YYYYMMDD-XXXX" v-model="studentSocialSecurityNumber">
            <input type="text" placeholder="Email" v-model="studentEmail">
            <input type="tel" placeholder="Telefonnummer" v-model="studentPhoneNumber">
            <input type="text" placeholder="Adress" v-model="studentAdress">
            <input type="text" placeholder="postkod" v-model="studentZip">
            <input type="text" placeholder="Stad" v-model="studentCity">
            <input type="text" placeholder="vårdnashavare" v-model="studentGuardian">
            <h3>Skoluppgifter</h3>
            <input type="text" placeholder="Klass" v-model="studentGroup">
            <button @click="tagCount++">Add Tag</button>
            <button @click="DecrimentTagCount">Remove Tag</button>
            <h3>Administration</h3>
            <input type="password" placeholder="temporärt lösenord" v-model="tempPassword">
        </div>
        <div class="bunch-of-stuff">
            <select v-for="n in tagCount" class="student-list-tags">
                <option v-for="tag in props.tags" :value="tag.name">{{ tag.name }}</option>
            </select>
        </div>
    </div>

    <div id="input-group">
        <div>
            <input id="group-name" type="text" placeholder="Group Name">
            <button @click="studentCount++">Add Student</button>
            <button @click="DecrimentStudentCount">Remove Student</button>
        </div>
        <div class="bunch-of-stuff">
            <select v-for="n in studentCount" class="group-list-students">
                <option v-for="student in props.students" :value="student.name">{{ student.name }}</option>
            </select>
        </div>
    </div>
    <div id="input-classroom"><input id="classroom-name" type="text" placeholder="Location's Name"></div>
    <div id="input-subject"> <input id="subject-name" type="text" placeholder="Subject's Name"> </div>
    <div id="input-tag"> <input id="tag-name" type="text" placeholder="Tag's Name"> </div>

    <p>
        <button id="btn" @click="PutRequest">Create</button>
        <span id="status-message">{{ responseMessage }}</span>
    </p>
</template>

<style scoped>
input {
    display: block;
    min-width: 200px;
    margin-left: 2vw;
    margin-top: 2vh;
    margin-bottom: 2vh;
}

select {
    display: block;
    min-width: 200px;
    margin-left: 2vw;
    margin-top: 2vh;
    margin-bottom: 2vh;
}

button {
    margin-top: 1vh;
    margin-left: 4vw;
    padding: 3px;
}
h3 { margin-left : 1vw } 

.bunch-of-stuff {
    height: 30vh;
    overflow-y: auto;
}

#status-message {
    display: inline-block;
    text-align: center;
    width: 130px;
    margin-left: 2vw;
    padding: 1vw;
    border-radius: 20px;
    background-color: rgb(180, 180, 180);
}

#input-student {
    display: none;
    grid-auto-flow: column;
}

#input-group {
    display: none;
    grid-auto-flow: column;
}

#input-classroom {
    display: none;
}

#input-subject {
    display: none;
}

#input-tag {
    display: none;
}
</style>