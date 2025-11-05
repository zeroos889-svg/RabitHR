import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  User,
  Mail,
  Calendar,
  Clock,
  Upload,
  Loader2,
  Save,
  Shield,
  Camera,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Profile() {
  const { user, loading: authLoading } = useAuth({
    redirectOnUnauthenticated: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Get profile data
  const {
    data: profileData,
    isLoading: profileLoading,
    refetch,
  } = trpc.profile.getProfile.useQuery(undefined, {
    enabled: !!user,
  });

  // Update form when profile data changes
  useEffect(() => {
    if (profileData?.user) {
      setName(profileData.user.name || "");
      setEmail(profileData.user.email || "");
    }
  }, [profileData]);

  // Update profile mutation
  const updateProfileMutation = trpc.profile.updateProfile.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث الملف الشخصي بنجاح");
      setIsEditing(false);
      refetch();
    },
    onError: error => {
      toast.error("فشل تحديث الملف الشخصي: " + error.message);
    },
  });

  // Upload file mutation
  const uploadFileMutation = trpc.consulting.uploadFile.useMutation();

  // Upload profile picture mutation
  const uploadProfilePictureMutation =
    trpc.profile.uploadProfilePicture.useMutation({
      onSuccess: () => {
        toast.success("تم تحديث صورة الملف الشخصي بنجاح");
        refetch();
      },
      onError: error => {
        toast.error("فشل تحديث الصورة: " + error.message);
      },
    });

  const handleSave = () => {
    updateProfileMutation.mutate({
      name: name || undefined,
      email: email || undefined,
    });
  };

  const handleCancel = () => {
    if (profileData?.user) {
      setName(profileData.user.name || "");
      setEmail(profileData.user.email || "");
    }
    setIsEditing(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("حجم الملف يجب أن يكون أقل من 5MB");
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("يجب أن يكون الملف صورة");
      return;
    }

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;

        // Upload to S3
        const uploadResult = await uploadFileMutation.mutateAsync({
          fileName: file.name,
          fileType: file.type,
          fileData: base64,
        });

        // Update profile picture
        await uploadProfilePictureMutation.mutateAsync({
          imageUrl: uploadResult.url,
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return parts[0][0] + parts[1][0];
    }
    return name[0];
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return "غير متوفر";
    return new Date(date).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const userData = profileData?.user;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Header />

      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gradient-primary">
              الملف الشخصي
            </h1>
            <p className="text-muted-foreground mt-2">
              إدارة معلوماتك الشخصية وإعدادات حسابك
            </p>
          </div>

          {/* Profile Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src={userData?.profilePicture || undefined}
                      />
                      <AvatarFallback className="text-2xl bg-gradient-primary text-white">
                        {getInitials(userData?.name || null)}
                      </AvatarFallback>
                    </Avatar>
                    <label
                      htmlFor="profile-picture-upload"
                      className="absolute bottom-0 left-0 h-7 w-7 rounded-full bg-primary text-white flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
                    >
                      <Camera className="h-4 w-4" />
                      <input
                        id="profile-picture-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={
                          uploadFileMutation.isPending ||
                          uploadProfilePictureMutation.isPending
                        }
                      />
                    </label>
                    {(uploadFileMutation.isPending ||
                      uploadProfilePictureMutation.isPending) && (
                      <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">
                      {userData?.name || "مستخدم"}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Mail className="h-4 w-4" />
                      {userData?.email || "لا يوجد بريد إلكتروني"}
                    </CardDescription>
                  </div>
                </div>
                {!isEditing && (
                  <Button onClick={() => setIsEditing(true)}>
                    تعديل الملف الشخصي
                  </Button>
                )}
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="pt-6">
              {isEditing ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <div className="relative">
                      <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="أدخل اسمك الكامل"
                        className="pr-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="example@company.com"
                        className="pr-10"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleSave}
                      disabled={updateProfileMutation.isPending}
                      className="gradient-primary text-white"
                    >
                      {updateProfileMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          جاري الحفظ...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          حفظ التغييرات
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      disabled={updateProfileMutation.isPending}
                    >
                      إلغاء
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <User className="h-4 w-4" />
                        <span>الاسم الكامل</span>
                      </div>
                      <p className="text-lg font-medium">
                        {userData?.name || "غير محدد"}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Mail className="h-4 w-4" />
                        <span>البريد الإلكتروني</span>
                      </div>
                      <p className="text-lg font-medium">
                        {userData?.email || "غير محدد"}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Shield className="h-4 w-4" />
                        <span>نوع الحساب</span>
                      </div>
                      <p className="text-lg font-medium">
                        {userData?.role === "admin" ? "مدير" : "مستخدم"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4" />
                        <span>تاريخ التسجيل</span>
                      </div>
                      <p className="text-lg font-medium">
                        {formatDate(userData?.createdAt || null)}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Clock className="h-4 w-4" />
                        <span>آخر تسجيل دخول</span>
                      </div>
                      <p className="text-lg font-medium">
                        {formatDate(userData?.lastSignedIn || null)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>معلومات الحساب</CardTitle>
              <CardDescription>معلومات إضافية حول حسابك ونشاطك</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-sm text-muted-foreground">
                    معرف المستخدم
                  </span>
                  <span className="font-mono text-sm">{userData?.id}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-sm text-muted-foreground">
                    طريقة تسجيل الدخول
                  </span>
                  <span className="text-sm">
                    {userData?.loginMethod || "Manus OAuth"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-muted-foreground">
                    حالة الحساب
                  </span>
                  <span className="text-sm text-green-600 font-medium">
                    نشط
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
