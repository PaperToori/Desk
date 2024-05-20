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
            <v-text-field type="text" label="Förnamn Efternamn" v-model="teacherName"></v-text-field>
            <v-text-field type="text" label="Personnummer YYYYMMDD-XXXX" v-model="teacherSocialSecurityNumber"></v-text-field>
            <v-text-field type="text" label="Email" v-model="teacherEmail"></v-text-field>
            <v-text-field type="tel" label="Telefonnummer" v-model="teacherPhoneNumber"></v-text-field>
            <v-text-field type="text" label="Adress" v-model="teacherAdress"></v-text-field>
            <v-text-field type="text" label="postkod" v-model="teacherZip"></v-text-field>
            <v-text-field type="text" label="Stad" v-model="teacherCity"></v-text-field>
            <h3>Administration</h3>
            <v-text-field v-model="teacherTempPassword" type="password" label="Temporärt lösenord"></v-text-field>
        </div>
    </div>
    <div class="columnautoflow" v-if="adminStore.selected === 'student'">
        <div>
            <div>
                <h3>Personuppgifter</h3>
                <v-form>
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="studentName" label="Förnamn Efternamn"></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="studentSocialSecurityNumber" Placeholder="YYYYMMDD-XXXX"
                                    label="personnummer"></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="studentEmail" label=" Email"></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="studentPhoneNumber" label="Telefonnummer"></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="studentAdress" label="Adress"></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="studentZip" label="postkod"></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="studentCity" label="Stad"></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="studentGuardian" label="vårdnashavare"></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="studentGuardianID"
                                    label="vårdnashavare personnummer"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
                <h3>Skoluppgifter</h3>
                <select name="klass" v-model="studentGroup">
                    <option v-for="group in props.groups" :value="group.name">{{ group.name }}</option>
                </select>
                <v-btn @click="tagCount++">Add Tag</v-btn>
                <v-btn @click="DecrimentTagCount">Remove Tag</v-btn>
                <h3>Administration</h3>
                <v-text-field v-model="tempPassword" type="password" label="Temporärt lösenord"></v-text-field>
            </div>
            <!-- If guardian doesnt exist the user should fill out their information -->
            <div v-if="!studentGuardianExists">
                <h2>Vårdnashavare</h2>
                <p>vårdnashavaren finns inte än. var god och fyll i deras information</p>
                <h3>Personuppgifter</h3>
                <v-text-field type="text" label="Förnamn Efternamn" v-model="guardianName"></v-text-field>
                <v-text-field type="text" label="Personnummer YYYYMMDD-XXXX" v-model="guardianSocialSecurityNumber"></v-text-field>
                <v-text-field type="text" label="Email" v-model="guardianEmail"></v-text-field>
                <v-text-field type="tel" label="Telefonnummer" v-model="guardianPhoneNumber"></v-text-field>
                <v-text-field type="text" label="Adress" v-model="guardianAdress"></v-text-field>
                <v-text-field type="text" label="postkod" v-model="guardianZip"></v-text-field>
                <v-text-field type="text" label="Stad" v-model="guardianCity"></v-text-field>
                <v-text-field type="text" label="barn" v-model="guardianChild"></v-text-field>
                <v-text-field type="text" label="barns personnummer" v-model="guardianChildID"></v-text-field>
                <h3>Administration</h3>
                <v-text-field v-model="guardianTempPassword" type="password" label="Temporärt lösenord"></v-text-field>
                <div id="small">
                    <p>skapa vårdnashavare:</p>
                    <v-btn id="small-btn" @click="PutRequestGuardian">Create</v-btn>
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
            <v-text-field v-model="groupName" type="text" label="Group Name"></v-text-field>
            <v-btn @click="studentCount++">Add Student</v-btn>
            <v-btn @click="DecrimentStudentCount">Remove Student</v-btn>
        </div>
        <div class="bunch-of-stuff">
            <select v-for="n in studentCount" v-model="groupList[n - 1]">
                <option v-for="student in props.students" :value="student">{{ student.name }}</option>
            </select>
        </div>
    </div>
    <div v-if="adminStore.selected === 'classroom'">
        <v-text-field v-model="classroomName" type="text" label="Location's Name"></v-text-field>
    </div>
    <div v-if="adminStore.selected === 'subject'">
        <v-text-field v-model="subjectName" type="text" label="Subject's Name"></v-text-field>
    </div>
    <div v-if="adminStore.selected === 'tag'">
        <v-text-field v-model="tagName" type="text" label="Tag's Name"></v-text-field>
    </div>
    <div class="columnautoflow" v-if="adminStore.selected === 'course'">
        <div>
            <v-text-field v-model="courseName" type="text" label="Kurs namn"></v-text-field>
            <p>
                Klass: {{ courseGroup }}
                <select name="klass" v-model="courseGroup">
                    <option v-for="group in props.groups" :value="group.name">{{ group.name }}</option>
                </select>
            </p>
            <p>
                Ämne: {{ courseSubject }}
                <v-select name="ämne" v-model="courseSubject" :items="props.subjects">
                    <option v-for="subject in props.subjects" :value="subject.name">{{ subject.name }}</option>
                </v-select>
            </p>
            <p>
                Lärare: {{ courseTeacher }}
                <select name="Lärare" v-model="courseTeacher">
                    <option v-for="teacher in props.teachers" :value="teacher._id">{{ teacher.name }}</option>
                </select>
            </p>
            <v-btn id="btn" @click="courseName = `${courseSubject} ${courseGroup}`">generera namn</v-btn>
        </div>
    </div>
    <p>
        <v-btn id="btn" @click="PutRequest">Create</v-btn>
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