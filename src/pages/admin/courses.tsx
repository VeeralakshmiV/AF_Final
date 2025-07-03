import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CourseEditor } from '@/components/admin/CourseEditor';

const AdminCourses: React.FC = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [recentCourses, setRecentCourses] = useState<any[]>([]);

  useEffect(() => {
    fetchRecentCourses();
  }, []);

  const fetchRecentCourses = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    if (!error) setRecentCourses(data || []);
  };

  const handleCreateCourse = () => {
    setSelectedCourseId(null);
    setShowEditor(true);
  };

  const handleEditorClose = () => {
    setShowEditor(false);
    setSelectedCourseId(null);
    fetchRecentCourses();
  };

  return (
    <div className="container mx-auto py-8">
      {showEditor ? (
        <CourseEditor courseId={selectedCourseId || undefined} onSave={handleEditorClose} />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Course Management</h1>
            <Button onClick={handleCreateCourse} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Create New Course
            </Button>
          </div>
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <span className="text-gray-900">Recent Courses</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentCourses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No courses created yet.</p>
                  <Button onClick={handleCreateCourse} className="bg-gradient-to-r from-blue-600 to-blue-700">
                    Create Your First Course
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentCourses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{course.title}</h4>
                        <div className="flex items-center gap-3 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${course.is_published ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                            {course.is_published ? 'Published' : 'Draft'}
                          </span>
                          <span className="text-sm text-gray-600">₹{course.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AdminCourses;
