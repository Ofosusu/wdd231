document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("currentyear").textContent = document.lastModified;

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students learn to research, write, test, and debug functions.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces classes, objects, inheritance, and polymorphism.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students learn JavaScript to create dynamic websites.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students focus on user experience, accessibility, and APIs.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const container = document.querySelector("#course-list");

function displayCredits(courseList) {
    const total = courseList.reduce((sum, course) => sum + course.credits, 0);

    document.querySelector("#credits").textContent =
        `Total Credits: ${total}`;
}

function displayCourses(courseList) {
    container.innerHTML = "";

    courseList.forEach(course => {
        const card = document.createElement("button");

        card.textContent = `${course.subject} ${course.number}`;

        if (course.completed) {
            card.classList.add("completed");
        }

        container.appendChild(card);
    });

    displayCredits(courseList);
}

displayCourses(courses);

document.querySelector("#all").addEventListener("click", () => {
    displayCourses(courses);
});

document.querySelector("#wdd").addEventListener("click", () => {
    displayCourses(
        courses.filter(course => course.subject === "WDD")
    );
});

document.querySelector("#cse").addEventListener("click", () => {
    displayCourses(
        courses.filter(course => course.subject === "CSE")
    );
});