// pages/groups/[id].js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js router
import { useAuthInfo } from '@propelauth/react'; // Use PropelAuth
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import db from '@/firebase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import Sidebar from '../../components/Sidebar';
import { useParams } from 'next/navigation'; // Import useParams

export default function GroupDetail() {
  const router = useRouter(); // Get router
  const { id } = useParams(); // Use useParams to get the group ID
  const { user, isLoggedIn, loading } = useAuthInfo(); // Use PropelAuth to get user info
  const userId = user?.userId; // PropelAuth user ID
  const [group, setGroup] = useState(null);
  const [loadingGroup, setLoadingGroup] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [isMember, setIsMember] = useState(false);
  const [messages, setMessages] = useState([]); // New state for messages

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [loading, isLoggedIn, router]);

  useEffect(() => {
    if (id && userId) {
      fetchGroup();
    }
  }, [id, userId, router]);

  const fetchGroup = async () => {
    const groupRef = doc(db, 'groups', id);
    const groupSnapshot = await getDoc(groupRef);

    if (groupSnapshot.exists()) {
      const groupData = groupSnapshot.data();
      setGroup(groupData);

      // Load messages into state
      setMessages(groupData.messages || []);

      // Check if the current user is a member
      const members = groupData.members || [];
      setIsMember(members.some(member => member.id === userId));
    } else {
      console.error("No such group!");
      router.push('/groups'); // Redirect to groups if the group does not exist
    }
    setLoadingGroup(false);
  };

  const joinGroup = async () => {
    if (!isMember && userId) {
      const groupRef = doc(db, 'groups', id);
      await updateDoc(groupRef, {
        members: [...(group.members || []), { id: userId, name: user.name }],
      });
      setIsMember(true);
      fetchGroup(); // Fetch the group again to update the UI
    }
  };

  const leaveGroup = async () => {
    if (isMember) {
      const groupRef = doc(db, 'groups', id);
      const updatedMembers = group.members.filter(member => member.id !== userId);
      await updateDoc(groupRef, {
        members: updatedMembers,
      });
      setIsMember(false);

      router.push('/groups'); // Redirect to groups after leaving the group
    }
  };

  const addMessage = async () => {
    if (newMessage.trim()) {
      const groupRef = doc(db, 'groups', id);
      const message = {
        text: newMessage,
        userId,
        userName: user.name,
        createdAt: new Date(),
      };
      await updateDoc(groupRef, {
        messages: [
          ...(group.messages || []),
          message,
        ],
      });
      setNewMessage('');

      // Update messages in local state
      setMessages(prevMessages => [...prevMessages, message]);
    }
  };

  if (loadingGroup || loading) {
    return <div>Loading...</div>;
  }

  if (!group) {
    return <div>No group found</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-8 w-full bg-gray-100 min-h-screen">
        <div className="mt-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome to {group.name}</h1>
          <div>
            {isMember ? (
              <Button onClick={leaveGroup} className="m-4">Leave Group</Button>
            ) : (
              <Button onClick={joinGroup} className="m-4">Join Group</Button>
            )}
            <Button onClick={() => router.push('/groups')} className="m-4">Back to Groups</Button>
          </div>
        </div>

        <Tabs defaultValue="info" className="mt-4">
          <TabsList>
            <TabsTrigger value="info">Group Info</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <p><span>Description:</span> {group.description}</p>
            <p>Number of Members: {group.members.length}</p>
            <p>Date Created: {group.dateCreated ? new Date(group.dateCreated.seconds * 1000).toLocaleDateString() : 'N/A'}</p>
          </TabsContent>

          <TabsContent value="messages">
            <div>
              {(messages || []).map((msg, index) => (
                <div key={index} className="border-b p-2 flex justify-between items-start">
                  <span className="flex-1">{msg.text}</span>
                  <div className="flex flex-col items-end">
                    <span>{msg.userName}</span>
                    <span className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Label htmlFor="newMessage">Add a Message:</Label>
              <Input
                id="newMessage"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="mt-2"
              />
              <Button onClick={addMessage} className="mt-2">Send</Button>
            </div>
          </TabsContent>

          <TabsContent value="members">
            <ul>
              {group.members.map((member, index) => (
                <li key={index}>{member.name}</li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
