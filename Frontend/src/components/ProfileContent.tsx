"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  UserCheck,
  CheckCircle,
  Calendar,
  Package,
  Film,
  Trophy,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/utils/api";
import { useAuthStore } from "./AuthProvider";

interface UserType {
  id: string;
  email: string;
  name: string;
}

interface SubscriptionInfo {
  status: string;
  planId: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  canceledAt?: string;
  endedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProfileItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}

interface AuthStore {
  user: UserType | null;
  isLoggedIn: boolean;
  fetchAuth: () => Promise<void>;
}

function ProfileItem({
  icon,
  label,
  value,
  highlight = false,
}: ProfileItemProps) {
  return (
    <Card
      className={`transition-all duration-300 hover:scale-105 ${
        highlight ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" : ""
      }`}
    >
      <CardContent className="flex items-center space-x-4 p-6">
        <div
          className={`text-2xl ${
            highlight ? "text-purple-500" : "text-gray-600 dark:text-gray-300"
          }`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProfileContent() {
  const router = useRouter();
  const { user, isLoggedIn, fetchAuth } = useAuthStore((state: AuthStore) => ({
    user: state.user,
    isLoggedIn: state.isLoggedIn,
    fetchAuth: state.fetchAuth,
  }));
  const [isLoading, setIsLoading] = useState(true);
  const [subInfo, setSubInfo] = useState<SubscriptionInfo | null>(null);

  useEffect(() => {
    const fetchSubInfo = async () => {
      try {
        const response = await api.get("/sub-info");
        setSubInfo(response.data.userSubInfo);
      } catch (error) {
        console.error("Failed to fetch subscription info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const checkAuth = async () => {
      if (!isLoggedIn) {
        await fetchAuth();
      }
      fetchSubInfo();
    };

    checkAuth();
  }, [isLoggedIn, fetchAuth]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 mt-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Your Stremify Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your account and subscription details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {user && (
          <>
            <ProfileItem icon={<User />} label="User ID" value={user.id} />
            <ProfileItem icon={<Mail />} label="Email" value={user.email} />
            <ProfileItem
              icon={<UserCheck />}
              label="Name"
              value={user.name}
              highlight={true}
            />
          </>
        )}
      </div>

      {subInfo && (
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Package className="text-purple-500" />
                Subscription Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileItem
                icon={<CheckCircle />}
                label="Status"
                value={subInfo.status}
                highlight={subInfo.status === "active"}
              />
              <ProfileItem
                icon={<Package />}
                label="Plan ID"
                value={subInfo.planId}
              />
              <ProfileItem
                icon={<Calendar />}
                label="Current Period Start"
                value={new Date(
                  subInfo.currentPeriodStart
                ).toLocaleDateString()}
              />
              <ProfileItem
                icon={<Calendar />}
                label="Current Period End"
                value={new Date(subInfo.currentPeriodEnd).toLocaleDateString()}
              />
              <ProfileItem
                icon={<CheckCircle />}
                label="Cancel At Period End"
                value={subInfo.cancelAtPeriodEnd ? "Yes" : "No"}
              />
              {subInfo.canceledAt && (
                <ProfileItem
                  icon={<Calendar />}
                  label="Canceled At"
                  value={new Date(subInfo.canceledAt).toLocaleDateString()}
                />
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
