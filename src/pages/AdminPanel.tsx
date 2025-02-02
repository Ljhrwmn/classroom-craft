import { Card } from "@/components/ui/card";

const AdminPanel = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-2">Manage Classes</h2>
          <p className="text-gray-600">Create and manage school classes</p>
        </Card>
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-2">Manage Teachers</h2>
          <p className="text-gray-600">Add and manage teacher accounts</p>
        </Card>
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-2">Manage Subjects</h2>
          <p className="text-gray-600">Create and configure subjects</p>
        </Card>
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-2">Schedule Management</h2>
          <p className="text-gray-600">Configure class schedules</p>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;