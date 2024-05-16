<script setup>
import { watch, ref } from 'vue';
import { useAdminStore, useAuthStore } from '@/stores/store';

const props = defineProps({ tags: Array, teachers: Array, students: Array, groups: Array, subjects: Array, });

// Pinia Stores
const Auth = useAuthStore();
Auth.Inject();
let adminStore = useAdminStore();

// Variables --> Server response
let responseMessage = ref('No Status');
let smallResponseMessage = ref('No Status');

// Variables --> Teacher 
let teacherName = ref();
let teacherSocialSecurityNumber = ref();
let teacherEmail = ref();
let teacherPhoneNumber = ref();
let teacherAdress = ref();
let teacherZip = ref();
let teacherCity = ref();
let teacherCourse = ref();
let teacherTempPassword = ref();

// Variables --> Student
let studentGuardianExists = ref(true);
let studentName = ref();
let studentSocialSecurityNumber = ref();
let studentEmail = ref();
let studentPhoneNumber = ref();
let studentAdress = ref();
let studentZip = ref();
let studentCity = ref();
let studentGuardian = ref();
let studentGuardianID = ref();
let tempPassword = ref();
let studentGroup = ref();
let tagCount = ref(0);

// Variables --> guardian
let guardianName = ref();
let guardianSocialSecurityNumber = ref();
let guardianEmail = ref();
let guardianPhoneNumber = ref();
let guardianAdress = ref();
let guardianZip = ref();
let guardianCity = ref();
let guardianChild = ref();
let guardianChildID = ref();
let guardianTempPassword = ref();

// Variables --> Group/Class
let groupName = ref('');
let groupList = ref([]);
let studentCount = ref(0);

// Variables --> Course
let courseName = ref();
let courseSubject = ref();
let courseGroup = ref();
let courseTeacher = ref();

// Variables --> Classroom, Subject, and Tag
let classroomName = ref('');
let subjectName = ref('');
let tagName = ref('');

watch(() => adminStore.selected, () => {
    // Reset text boxes and status display
    classroomName.value = '';
    subjectName.value = '';
    tagName.value = '';
    document.getElementById('status-message').style.backgroundColor = 'rgb(180, 180, 180)';
    responseMessage.value = 'No Status';
    tagCount.value = 0;
    studentCount.value = 0;
});

async function PutRequestGuardian() {

    let response;

    let id = "undefined";
    if (Auth.auth.currentUser) {
        id = await Auth.auth.currentUser.getIdToken(true);
    }
    let headersList = {
        "id": id,
        "guardian": studentGuardianID
    }
    //check if guardian exsists

    console.log(studentGuardianExists.value);
    // Attempt POST request
    try {
        response = await fetch("http://localhost:8080/guardians/", {
            method: "POST",
            headers: headersList,
            body: JSON.stringify({
                name: guardianName.value,
                email: guardianEmail.value,
                phoneNumber: guardianPhoneNumber.value,
                socialSecurityNumber: guardianSocialSecurityNumber.value,
                adress: guardianAdress.value,
                zip: guardianZip.value,
                city: guardianCity.value,
                child: guardianChild.value,
                childID: guardianChildID.value,
                tempPassword: guardianTempPassword.value,
            })
        });
    } catch (error) {
        console.log(error.message);
    }

    smallResponseMessage.value = await response.text();
    if (response.status === 200) {
        studentGuardianExists.value = "true";
        document.getElementById('small-status-message').style.backgroundColor = "rgb(100, 180, 100)";
    } else { document.getElementById('small-status-message').style.backgroundColor = "rgb(210, 110, 110)"; }
}
async function PatchRequestGuardian() {

    let response;

    let id = "undefined";
    if (Auth.auth.currentUser) {
        id = await Auth.auth.currentUser.getIdToken(true);
    }
    let headersList = {
        "id": id,
        "guardian": studentGuardianID
    }
    // Attempt POST request
    try {
        response = await fetch("http://localhost:8080/guardians/", {
            method: "PATCH",
            headers: headersList,
            body: JSON.stringify({
                id: guardianSocialSecurityNumber.value,
                childID: studentSocialSecurityNumber.value,
            })
        });
    } catch (error) {
        console.log(error.message);
    }

    smallResponseMessage.value = await response.text();
    if (response.status === 200) {
        document.getElementById('small-status-message').style.backgroundColor = "rgb(100, 180, 100)";
    } else { document.getElementById('small-status-message').style.backgroundColor = "rgb(210, 110, 110)"; }
}

async function PutRequest() {

    let response;

    let id = "undefined";
    if (Auth.auth.currentUser) {
        id = await Auth.auth.currentUser.getIdToken(true);
    }
    let headersList = {
        "id": id
    }

    // /// Create new Teacher
    if (adminStore.selected === 'teacher') {
        
        // Attempt POST request
        try {
            response = await fetch("http://localhost:8080/teachers/", {
                method: "POST",
                headers: headersList,
                body: JSON.stringify({
                    name: teacherName.value,
                    email: teacherEmail.value,
                    phoneNumber: teacherPhoneNumber.value,
                    socialSecurityNumber: teacherSocialSecurityNumber.value,
                    adress: teacherAdress.value,
                    zip: teacherZip.value,
                    city: teacherCity.value,
                    tempPassword: teacherTempPassword.value,
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
        id = "undefined";
        if (Auth.auth.currentUser) {
            id = await Auth.auth.currentUser.getIdToken(true);
        }
        headersList = {
            "id": id,
            "guardian": studentGuardianID.value
        }
        //check if guardian exists
        try {
            studentGuardianExists.value = await fetch("http://localhost:8080/guardians/exists", {
                method: "GET",
                headers: headersList
            });
        } catch (error) {
            console.log(error.message);
        }
        studentGuardianExists.value = await studentGuardianExists.value.json()
        console.log(studentGuardianExists.value);
        if (studentGuardianExists.value === "true") {
            // Attempt POST request
            try {
                response = await fetch("http://localhost:8080/students/", {
                    method: "POST",
                    headers: headersList,
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
                        guardianID: studentGuardianID.value,
                        tempPassword: tempPassword.value,
                        group: studentGroup.value,
                    })
                });
            } catch (error) {
                console.log(error.message);
            }
            await PatchRequestGuardian();
        }
        else {
            console.log("guardian doesnt exsist");
            studentGuardianExists.value = false;
        }
    }
    // /// Create New Group
    else if (adminStore.selected === 'group') {
        // Init values
        let groupMembers = GetGroupMembersInfo();
        // Attempt POST request
        try {
            response = await fetch("http://localhost:8080/groups/", {
                method: "POST",
                headers: headersList,
                body: JSON.stringify({
                    name: groupName.value,
                    members: groupMembers
                })
            });
        } catch (error) {
            console.log(error.message);
        }
    }
    // /// Create new Classroom 
    else if (adminStore.selected === 'classroom') {
        // Attempt POST request
        try {
            response = await fetch("http://localhost:8080/classrooms/", {
                method: "POST",
                headers: headersList,
                body: JSON.stringify({ name: classroomName.value })
            });
        } catch (error) {
            console.log(error.message);
        }
    }
    // /// Create new Subject
    else if (adminStore.selected === 'subject') {
        // Attempt POST request
        try {
            response = await fetch("http://localhost:8080/subjects/", {
                method: "POST",
                headers: headersList,
                body: JSON.stringify({ name: subjectName.value })
            });
        } catch (error) {
            console.log(error.message);
        }
    }
    // /// Create new Tag
    else if (adminStore.selected === 'tag') {
        // Attempt POST request
        try {
            response = await fetch("http://localhost:8080/tags/", {
                method: "POST",
                headers: headersList,
                body: JSON.stringify({ name: tagName.value })
            });
        } catch (error) {
            console.log(error.message);
        }
    }
    // /// Create new Course
    else if (adminStore.selected === 'course') {
        
        // Attempt POST request
        try {
            response = await fetch("http://localhost:8080/course/", {
                method: "POST",
                headers: headersList,
                body: JSON.stringify({
                    name: courseName.value,
                    group: courseGroup.value,
                    subject: courseSubject.value,
                    teacher: courseTeacher.value,
                })
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

function GetGroupMembersInfo() {
    let selectedStudents = [];
    groupList.value.forEach((member) => {
        selectedStudents.push({
            id: member._id,
            name: member.name
        });
    });
    return selectedStudents;
}

</script>

<template>
    <div v-if="adminStore.selected === 'teacher'">
        <div>
            <h3>Personuppgifter</h3>
            <input type="text" placeholder="Förnamn Efternamn" v-model="teacherName">
            <input type="text" placeholder="Personnummer YYYYMMDD-XXXX" v-model="teacherSocialSecurityNumber">
            <input type="text" placeholder="Email" v-model="teacherEmail">
            <input type="tel" placeholder="Telefonnummer" v-model="teacherPhoneNumber">
            <input type="text" placeholder="Adress" v-model="teacherAdress">
            <input type="text" placeholder="postkod" v-model="teacherZip">
            <input type="text" placeholder="Stad" v-model="teacherCity">
            <h3>Administration</h3>
            <input type="password" placeholder="temporärt lösenord" v-model="teacherTempPassword">
        </div>
    </div>
    <div class="columnautoflow" v-if="adminStore.selected === 'student'">
        <div>
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
                <input type="text" placeholder="vårdnashavare personnummer" v-model="studentGuardianID">
                <h3>Skoluppgifter</h3>
                <select name="klass" v-model="studentGroup">
                    <option v-for="group in props.groups" :value="group.name">{{ group.name }}</option>
                </select>
                <button @click="tagCount++">Add Tag</button>
                <button @click="DecrimentTagCount">Remove Tag</button>
                <h3>Administration</h3>
                <input type="password" placeholder="temporärt lösenord" v-model="tempPassword">
            </div>
            <!-- If guardian doesnt exist the user should fill out their information -->
            <div v-if="!studentGuardianExists">
                <h2>Vårdnashavare</h2>
                <p>vårdnashavaren finns inte än. var god och fyll i deras information</p>
                <h3>Personuppgifter</h3>
                <input type="text" placeholder="Förnamn Efternamn" v-model="guardianName">
                <input type="text" placeholder="Personnummer YYYYMMDD-XXXX" v-model="guardianSocialSecurityNumber">
                <input type="text" placeholder="Email" v-model="guardianEmail">
                <input type="tel" placeholder="Telefonnummer" v-model="guardianPhoneNumber">
                <input type="text" placeholder="Adress" v-model="guardianAdress">
                <input type="text" placeholder="postkod" v-model="guardianZip">
                <input type="text" placeholder="Stad" v-model="guardianCity">
                <input type="text" placeholder="barn" v-model="guardianChild">
                <input type="text" placeholder="barns personnummer" v-model="guardianChildID">
                <h3>Administration</h3>
                <input type="password" placeholder="temporärt lösenord" v-model="guardianTempPassword">
                <div id="small">
                    <p>skapa vårdnashavare:</p>
                    <button id="small-btn" @click="PutRequestGuardian">Create</button>
                    <span id="small-status-message">{{ responseMessage }}</span>
                </div>
            </div>
        </div>
        <div class="bunch-of-stuff">
            <select v-for="n in tagCount" class="student-list-tags">
                <option v-for="tag in props.tags" :value="tag.name">{{ tag.name }}</option>
            </select>
        </div>
    </div>
    <div class="columnautoflow" v-if="adminStore.selected === 'group'">
        <div>
            <input v-model="groupName" type="text" placeholder="Group Name">
            <button @click="studentCount++">Add Student</button>
            <button @click="DecrimentStudentCount">Remove Student</button>
        </div>
        <div class="bunch-of-stuff">
            <select v-for="n in studentCount" v-model="groupList[n - 1]">
                <option v-for="student in props.students" :value="student">{{ student.name }}</option>
            </select>
        </div>
    </div>
    <div v-if="adminStore.selected === 'classroom'">
        <input v-model="classroomName" type="text" placeholder="Location's Name">
    </div>
    <div v-if="adminStore.selected === 'subject'">
        <input v-model="subjectName" type="text" placeholder="Subject's Name">
    </div>
    <div v-if="adminStore.selected === 'tag'">
        <input v-model="tagName" type="text" placeholder="Tag's Name">
    </div>
    <div class="columnautoflow" v-if="adminStore.selected === 'course'">
        <div>
            <input v-model="courseName" type="text" placeholder="Kurs namn">
            <p>
                Klass: {{ courseGroup }}
                <select name="klass" v-model="courseGroup">
                    <option v-for="group in props.groups" :value="group.name">{{ group.name }}</option>
                </select>
            </p>
            <p>
                Ämne: {{ courseSubject }}
                <select name="ämne" v-model="courseSubject">
                    <option v-for="subject in props.subjects" :value="subject.name">{{ subject.name }}</option>
                </select>
            </p>
            <p>
                Lärare: {{ courseTeacher }}
                <select name="Lärare" v-model="courseTeacher">
                    <option v-for="teacher in props.teachers" :value="teacher._id">{{ teacher.name }}</option>
                </select>
            </p>
            <button id="btn" @click="courseName = `${courseSubject} ${courseGroup}`">generera namn</button>
        </div>
    </div>
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
    margin-bottom: 3vh;
    padding: 3px;
}

h3 {
    margin-left: 1vw
}

.bunch-of-stuff {
    height: auto;
    max-height: 38.5vh;
    overflow-y: auto;
}

.columnautoflow {
    display: grid;
    grid-auto-flow: column;
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

#small {
    margin: 10px;
    padding: 10px;
    background-color: rgb(180, 180, 180);
}

#small-status-message {
    display: inline-block;
    text-align: center;
    width: 70px;
    margin-left: 2vw;
    padding: .5vw;
    border-radius: 10px;
    background-color: rgb(160, 200, 180);
    font-size: smaller;
}
</style>