'use client';
import Sidebar from '../Components/Sidebar';
import { useAuthInfo, useLogoutFunction } from '@propelauth/react'; // Use PropelAuth hooks
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, doc, getDoc, setDoc } from 'firebase/firestore';
import db from "@/firebase";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Groups() {
  const { user, isLoggedIn, loading } = useAuthInfo(); // Check if it's loading
  const [yourGroups, setYourGroups] = useState([]);
  const [findNewGroups, setFindNewGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Log user info to check what is available
    console.log('User Info:', user);
    console.log('User Id:', user?.userId);
    console.log('Is Logged In:', isLoggedIn);
    console.log('Loading:', loading);
  }, [user, isLoggedIn, loading]);

  useEffect(() => {
    // Wait until the user information is fully loaded and confirmed to be logged in
    if (!loading && !isLoggedIn) {
      router.push('/login'); // Redirect to login page if user is not signed in
    }
  }, [isLoggedIn, loading, router]);

  useEffect(() => {
    if (user?.userId) { // Ensure `userId` is present
      const groupsRef = collection(db, 'groups');

      // Set up a listener for changes to the groups collection
      const unsubscribe = onSnapshot(groupsRef, (snapshot) => {
        const allGroups = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter groups for the user's groups and other available groups
        const userGroups = allGroups.filter(group => group.members.some(member => member.id === user?.userId)); 
        const availableGroups = allGroups.filter(group => !group.members.some(member => member.id === user?.userId));

        setYourGroups(userGroups);
        setFindNewGroups(availableGroups);
      });

      return () => unsubscribe();
    } else {
      console.warn("User information is missing, cannot load groups.");
    }
  }, [user?.userId]);

  const createGroup = async () => {
    if (!newGroupName.trim() || !newGroupDescription.trim()) {
      alert('Please fill in all fields.');
      return;
    }
  
    // Ensure `user` object is defined and contains `userId` and `name`
    if (!user || !user?.userId || !user.name) {
      alert('User information is not available.');
      return;
    }

    const userId = user?.userId; // Use PropelAuth user ID
    const userName = user.name; // Use user name from PropelAuth

    console.log("Creating group with User ID:", userId);
  
    // Get a reference to the "groups" collection
    const groupRef = doc(db, 'groups', newGroupName); // Use the `doc` function from Firestore
  
    // Ensure the group name is unique
    const groupSnapshot = await getDoc(groupRef); // Get the document snapshot
    if (groupSnapshot.exists()) {
      alert('Group name must be unique.');
      return;
    }

    try {
      await setDoc(groupRef, {
        name: newGroupName,
        description: newGroupDescription,
        members: [{ id: userId, name: userName }], // Add the current user as the first member
        messages: [],
        dateCreated: new Date(),
      });

      // Clear input fields after group creation
      setNewGroupName('');
      setNewGroupDescription('');
    } catch (error) {
      console.error('Error creating group:', error);
      alert('Failed to create the group. Please try again.');
    }
  };

  const handleGroupClick = (id) => {
    router.push(`/groups/${id}`); // Navigate to group detail page
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-8 w-full bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Groups</h1>
        <p>Welcome to your groups! This is where you can find others with common health and fitness goals.</p>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-6">Create New Group</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new group.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="groupName" className="text-right">
                  Group Name
                </Label>
                <Input
                  id="groupName"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="groupDescription" className="text-right">
                  Description
                </Label>
                <Input
                  id="groupDescription"
                  value={newGroupDescription}
                  onChange={(e) => setNewGroupDescription(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setNewGroupName('');
                setNewGroupDescription('');
              }}>Cancel</Button>
              <Button onClick={createGroup}>Create Group</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Tabs defaultValue="yourGroups" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="yourGroups">Your Groups</TabsTrigger>
            <TabsTrigger value="findNewGroups">Find New Groups</TabsTrigger>
          </TabsList>

          <TabsContent value="yourGroups">
            <h2 className="text-xl mt-4">Your Groups</h2>
            <ul>
              {yourGroups.map((group) => (
                <li key={group.id} className="border p-4 mb-2 rounded">
                  <h3 className="font-semibold">{group.name}</h3>
                  <p>Description: {group.description}</p>
                  <p>Members: {group.members.length}</p>
                  <Button onClick={() => handleGroupClick(group.id)}>View Group</Button>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="findNewGroups">
            <h2 className="text-xl mt-4">Find New Groups</h2>
            <ul>
              {findNewGroups.map((group) => (
                <li key={group.id} className="border p-4 mb-2 rounded">
                  <h3 className="font-semibold">{group.name}</h3>
                  <p>Description: {group.description}</p>
                  <p>Members: {group.members.length}</p>
                  <Button onClick={() => handleGroupClick(group.id)}>Join Group</Button>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
