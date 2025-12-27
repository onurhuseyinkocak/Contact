
const skills = [
  { name: "React", level: 90 },
  { name: "React Native", level: 80 },
  { name: "JavaScript", level: 85 },
  { name: "TypeScript", level: 80 },
  { name: "HTML & CSS", level: 75 },
  { name: "Git & GitHub", level: 85 },
];

const Skills = () => {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Skills</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span>{skill.name}</span>
                <span>{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
