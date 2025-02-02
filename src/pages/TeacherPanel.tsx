import { Card } from "@/components/ui/card";

const TeacherPanel = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Teacher Panel</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-2">My Schedule</h2>
          <p className="text-gray-600">View your teaching schedule</p>
        </Card>
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-2">My Classes</h2>
          <p className="text-gray-600">View assigned classes</p>
        </Card>
      </div>
    </div>
  );
};

export default TeacherPanel;