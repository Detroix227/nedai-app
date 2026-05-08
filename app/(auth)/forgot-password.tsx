import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { KeyboardScreenView } from "@/components/KeyboardScreenView";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  async function handleReset() {
    if (!email.trim()) {
      setLocalError("Email is required.");
      return;
    }

    if (!isValidEmail(email)) {
      setLocalError("Enter a valid email address.");
      return;
    }

    setLocalError(null);
    setIsSubmitting(true);

    // Mock an API request for password reset
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  }

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <StatusBar style="dark" />

      <KeyboardScreenView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            <View className="flex-1 px-6 pb-10 pt-6">
              <TouchableOpacity
                onPress={() => router.back()}
                className="mb-8 h-10 w-10 items-center justify-center rounded-full bg-slate-100"
              >
                <Ionicons name="arrow-back" size={24} color="#0F172A" />
              </TouchableOpacity>

              <Text className="mb-2 text-3xl font-bold text-slate-900">
                Reset password
              </Text>

              <Text className="mb-10 text-slate-500">
                Enter your email address to receive instructions on how to reset your password.
              </Text>

              {isSuccess ? (
                <View className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
                  <View className="mb-4 h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <Ionicons name="mail-open-outline" size={24} color="#16a34a" />
                  </View>
                  <Text className="mb-2 text-xl font-bold text-slate-900">
                    Check your inbox
                  </Text>
                  <Text className="text-slate-600">
                    We have sent a password reset link to <Text className="font-semibold text-slate-900">{email}</Text>. Please follow the instructions in the email.
                  </Text>

                  <TouchableOpacity
                    className="mt-6 h-12 items-center justify-center rounded-xl bg-slate-900"
                    onPress={() => router.replace("/login")}
                  >
                    <Text className="text-base font-bold text-white">
                      Back to login
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View className="w-full">
                  <View className="mb-6">
                    <Text className="mb-2 ml-1 text-sm font-semibold text-slate-700">
                      Email Address
                    </Text>
                    <View className="h-14 flex-row items-center rounded-xl border border-slate-200 bg-slate-50 px-4">
                      <Ionicons name="mail-outline" size={20} color="#64748B" />
                      <TextInput
                        placeholder="name@company.com"
                        placeholderTextColor="#94A3B8"
                        className="ml-3 flex-1 text-base text-slate-900"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={email}
                        onChangeText={(value) => {
                          setEmail(value);
                          setLocalError(null);
                        }}
                      />
                    </View>
                  </View>

                  {localError ? (
                    <Text className="mb-4 px-1 text-sm text-red-600">
                      {localError}
                    </Text>
                  ) : null}

                  <TouchableOpacity
                    className={`mt-4 h-14 items-center justify-center rounded-xl shadow-sm ${isSubmitting ? "bg-slate-400" : "bg-slate-900"}`}
                    onPress={() => {
                      void handleReset();
                    }}
                    activeOpacity={isSubmitting ? 1 : 0.85}
                    disabled={isSubmitting}
                  >
                    <Text className="text-lg font-bold text-white">
                      {isSubmitting ? "Sending link..." : "Send Reset Link"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardScreenView>
    </SafeAreaView>
  );
}
