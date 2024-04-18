<script setup>
import { watch, ref } from 'vue';
import { useAdminStore } from '@/stores/store';

const props = defineProps({ courses: Array });

let adminStore = useAdminStore();
let responseMessage = ref('No Status');

watch(() => adminStore.selected, () => {
    // Reset text boxes and status display
    document.getElementById('teacher-name').value = '';
    document.getElementById('teacher-gmail').value = '';
    document.getElementById('teacher-phonenumber').value = '';
    document.getElementById('student-name').value = '';
    document.getElementById('student-gmail').value = '';
    document.getElementById('student-phonenumber').value = '';
    document.getElementById('student-course').value = '';
    document.getElementById('classroom-name').value = '';
    document.getElementById('subject-name').value = '';
    document.getElementById('course-name').value = '';
    document.getElementById('status-message').style.backgroundColor = 'rgb(180, 180, 180)';
    responseMessage.value = 'No Status';
    // Hide all options
    document.getElementById('teacher').style.display = 'none';
    document.getElementById('student').style.display = 'none';
    document.getElementById('group').style.display = 'none';
    document.getElementById('classroom').style.display = 'none';
    document.getElementById('subject').style.display = 'none';
    document.getElementById('course').style.display = 'none';

    // Display the selected option
    if (adminStore.selected === 'teacher') {
        document.getElementById('teacher').style.display = 'inline';
    } else if (adminStore.selected === 'student') {
        document.getElementById('student').style.display = 'inline';
    } else if (adminStore.selected === 'group') {
        document.getElementById('group').style.display = 'inline';
    } else if (adminStore.selected === 'classroom') {
        document.getElementById('classroom').style.display = 'inline';
    } else if (adminStore.selected === 'subject') {
        document.getElementById('subject').style.display = 'inline';
    } else if (adminStore.selected === 'course') {
        document.getElementById('course').style.display = 'inline'; 
    }
});

async function PutRequest() {

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
                }) });
        } catch (error) {
            console.log(error.message);
        }
    }
    // /// Create new Student
    else if (adminStore.selected === 'student') {
        // Init values for ease of use
        let studentName = document.getElementById('student-name').value;
        let studentGmail = document.getElementById('student-gmail').value;
        let studentPhoneNumber = document.getElementById('student-phonenumber').value;
        let studentCourse = document.getElementById('student-course').value;

        // Attempt POST request
        try {
            response = await fetch("http://localhost:8080/students/", {
                method: "POST",
                body: JSON.stringify({
                    name: studentName,
                    gmail: studentGmail,
                    phoneNumber: studentPhoneNumber,
                    course: studentCourse
                }) });
        } catch (error) {
            console.log(error.message);
        }
    }
    // /// Create New Group... this is gonna be a massive pain
    else if (adminStore.selected === 'group') {
        // Init values for ease of use
        // let st = document.getElementById('').value;
        // let st = document.getElementById('').value;

    //// Attempt POST request
        // try {
        //     response = await fetch("http://localhost:8080/groups/", {
        //         method: "POST",
        //         body : JSON.stringify({  })
        //     });
        // } catch (error) {
        //     console.log(error.message);
        // }
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
    // /// Create new Course
    else if (adminStore.selected === 'course') {
        // Init values for ease of use
        let courseName = document.getElementById('course-name').value;

        // Attempt POST request
        try {
            response = await fetch("http://localhost:8080/courses/", {
                method: "POST",
                body: JSON.stringify({ name: courseName })
            });
        } catch (error) {
            console.log(error.message);
        }
    }
    responseMessage.value = await response.text();
    if (response.status === 200){
        document.getElementById('status-message').style.backgroundColor = "rgb(100, 180, 100)";
    } else { document.getElementById('status-message').style.backgroundColor = "rgb(210, 110, 110)"; }
}

</script>

<template>
    <div id="teacher">
        <input id="teacher-name" type="text" placeholder="Full Name">
        <input id="teacher-gmail" type="text" placeholder="Gmail">
        <input id="teacher-phonenumber" type="tel" inputmode="numeric" placeholder="Phone Number">
    </div>
    <div id="student">
        <input id="student-name" type="text" placeholder="Full Name">
        <input id="student-gmail" type="text" placeholder="Gmail">
        <input id="student-phonenumber" type="tel" placeholder="Phone Number">
        <select id="student-course">
            <option value="" default disabled hidden>Select Course</option>
            <option v-for="course in props.courses" :value="course.name">{{ course.name }}</option>
        </select>
    </div>

    <div id="group">Missing</div> <!-- This is gonna be a massive pain is the ass, isn't it? -->

    <div id="classroom"><input id="classroom-name" type="text" placeholder="Location's Name"></div>
    <div id="subject"> <input id="subject-name" type="text" placeholder="Subject's Name"> </div>
    <div id="course"> <input id="course-name" type="text" placeholder="Course's Name"> </div>

    <button id="btn" @click="PutRequest">Create</button>
    <span id="status-message">{{ responseMessage }}</span>
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

#status-message { 
    display: inline-block;
    text-align: center;
    width: 130px;
    margin-left: 2vw;
    padding: 1vw;
    border-radius: 20px;
    background-color: rgb(180, 180, 180);
}
#student   { display: none; }
#group     { display: none; }
#classroom { display: none; }
#subject   { display: none; }
#course    { display: none; }
</style>