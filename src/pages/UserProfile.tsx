/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useGetUserInfoQuery } from '@/redux/features/auth/authApi';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Alert, AlertTitle } from '@/components/ui/alert';
// import { Card, CardContent } from '@/components/ui/card';

// const UserProfile = () => {
//   const { data, error, isLoading } = useGetUserInfoQuery({});

//   if (isLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen">
//         <Skeleton className="w-64 h-8 mb-4" />
//         <Skeleton className="w-40 h-6" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Alert variant="destructive">
//           <AlertTitle>Error</AlertTitle>
//           <p>Failed to fetch user data. Please try again later.</p>
//         </Alert>
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-center items-center mt-12">
//       <Card className="p-6 mt-20 shadow-lg w-96 dark:bg-gray-800">
//         <CardContent className="text-center ">
//           <h2 className="text-xl font-bold mb-2">My Profile</h2>
//           <p className="text-gray-700 dark:text-blue-200">Name: {data?.name}</p>
//           <p className="text-gray-700  dark:text-blue-200">
//             Email: {data?.email}
//           </p>
//           <p className="text-gray-700  dark:text-blue-200">
//             Phone: {data?.phone}
//           </p>
//           <p className="text-gray-700  dark:text-blue-200">
//             Address: {data?.address}
//           </p>
//           <p className="text-gray-700  dark:text-blue-200">
//             City: {data?.city}
//           </p>
//           <p className="text-gray-700  dark:text-blue-200">
//             CreatedAt: {data?.createdAt}
//           </p>
//           <p className="text-gray-700  dark:text-blue-200">
//             UpdatedAt: {data?.updatedAt}
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default UserProfile;





import { useState } from 'react';
import { useGetUserInfoQuery, useDeactivateUserMutation } from '@/redux/features/auth/authApi';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Pen, Save, X } from 'lucide-react';

const UserProfile = () => {
  const { data: userData, error, isLoading } = useGetUserInfoQuery({});
  const [updateUser, { isLoading: isUpdating }] = useDeactivateUserMutation();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: ''
  });

  // Initialize form data when userData is available
  useState(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        city: userData.city || ''
      });
    }
  }, );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(formData).unwrap();
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col  items-center justify-center h-screen space-y-4">
        <Skeleton className="w-64 h-10 rounded-lg" />
        <div className="space-y-2 w-full max-w-md">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="w-full h-8 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Alert variant="destructive" className="w-full max-w-md">
          <AlertTitle>Error</AlertTitle>
          <p>Failed to fetch user data. Please try again later.</p>
        </Alert>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPpp');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="container mx-auto py-12 mt-10 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>My Profile</CardTitle>
              <CardDescription>
                {isEditing ? 'Update your profile information' : 'View your profile details'}
              </CardDescription>
            </div>
            {!isEditing ? (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Pen className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled // Typically email shouldn't be changed
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </span>
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                  {userData?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="text-lg font-medium">{userData?.name}</h3>
                  <p className="text-sm text-muted-foreground">{userData?.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p>{userData?.phone || 'Not provided'}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">City</p>
                  <p>{userData?.city || 'Not provided'}</p>
                </div>
                
                <div className="sm:col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Address</p>
                  <p>{userData?.address || 'Not provided'}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                  <p>{userData?.createdAt ? formatDate(userData.createdAt) : 'Unknown'}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                  <p>{userData?.updatedAt ? formatDate(userData.updatedAt) : 'Unknown'}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
