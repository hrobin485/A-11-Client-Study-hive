import React from "react";

const testimonials = [
  {
    name: "Ariana Gomez",
    feedback:
      "StudyHive transformed our group studies! Assignments are organized, and grading each other is actually fun.",
    role: "University Student",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Samir Rahman",
    feedback:
      "I love how easy it is to submit assignments and get feedback instantly. It keeps us on track.",
    role: "College Learner",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
  {
    name: "Lina Chowdhury",
    feedback:
      "The best part is seeing everyone's progress and knowing how to improve myself.",
    role: "High School Student",
    avatar: "https://i.pravatar.cc/150?img=25",
  },
  {
    name: "Carlos Mendes",
    feedback:
      "Group discussions are clearer, and the peer‑grading feature saves us tons of time.",
    role: "Graduate Researcher",
    avatar: "https://i.pravatar.cc/150?img=49",
  },
];

const TestimonialsSection = () => (
  <section className="py-16 px-4 bg-slate-100 dark:bg-gray-800 dark:text-gray-100">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
      What Our Users Say
    </h2>
    <p className="text-center max-w-lg mx-auto mb-10 text-gray-600 dark:text-gray-300">
      Real feedback from learners around the world.
    </p>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
      {testimonials.map((u, idx) => (
        <article
          key={idx}
          className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow hover:shadow-lg transition">
          <img
            src={u.avatar}
            alt={u.name}
            className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
          />
          <p className="italic text-gray-700 dark:text-gray-200 mb-4">“{u.feedback}”</p>
          <h4 className="font-semibold text-center">{u.name}</h4>
          <span className="block text-sm text-center text-gray-500 dark:text-gray-400">
            {u.role}
          </span>
        </article>
      ))}
    </div>
  </section>
);

export default TestimonialsSection;
