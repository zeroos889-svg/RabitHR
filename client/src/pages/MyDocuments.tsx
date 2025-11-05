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
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Trash2,
  Download,
  Loader2,
  Search,
  BookMarked,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Link } from "wouter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function MyDocuments() {
  const { user, loading: authLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch saved documents
  const { data, isLoading, refetch } =
    trpc.documentGenerator.getMySavedDocuments.useQuery(undefined, {
      enabled: !!user,
    });
  const documents = data?.documents || [];

  // Delete mutation
  const deleteMutation = trpc.documentGenerator.deleteDocument.useMutation({
    onSuccess: () => {
      toast.success("تم حذف المستند بنجاح");
      refetch();
    },
    onError: error => {
      toast.error("فشل حذف المستند: " + error.message);
    },
  });

  // Filter documents based on search
  const filteredDocuments = documents.filter((doc: any) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      doc.templateCode?.toLowerCase().includes(query) ||
      doc.companyName?.toLowerCase().includes(query) ||
      doc.outputText?.toLowerCase().includes(query)
    );
  });

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>تسجيل الدخول مطلوب</CardTitle>
            <CardDescription>يجب تسجيل الدخول لعرض مكتبتك</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => (window.location.href = "/api/oauth/login")}
              className="w-full"
            >
              تسجيل الدخول
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
              <BookMarked className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">مكتبتي</h1>
              <p className="text-muted-foreground">جميع المستندات المحفوظة</p>
            </div>
          </div>

          {/* Search */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث في مستنداتك..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
            <Link href="/document-generator">
              <Button>
                <FileText className="ml-2 h-4 w-4" />
                مستند جديد
              </Button>
            </Link>
          </div>
        </div>

        {/* Documents Grid */}
        {filteredDocuments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <BookMarked className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {searchQuery ? "لا توجد نتائج" : "لا توجد مستندات محفوظة"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? "جرب كلمات بحث أخرى"
                  : "ابدأ بإنشاء مستندات جديدة وحفظها هنا"}
              </p>
              {!searchQuery && (
                <Link href="/document-generator">
                  <Button>
                    <FileText className="ml-2 h-4 w-4" />
                    إنشاء مستند جديد
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc: any) => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">
                        {doc.templateCode || "مستند"}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {new Date(doc.createdAt).toLocaleDateString("ar-SA", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="mr-2">
                      {doc.lang === "ar"
                        ? "عربي"
                        : doc.lang === "en"
                          ? "English"
                          : "ثنائي"}
                    </Badge>
                  </div>
                  {doc.companyName && (
                    <p className="text-sm text-muted-foreground mt-2">
                      🏢 {doc.companyName}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="ml-2 h-4 w-4" />
                      تحميل
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                          <AlertDialogDescription>
                            سيتم حذف هذا المستند نهائياً ولا يمكن استرجاعه.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>إلغاء</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              deleteMutation.mutate({ documentId: doc.id })
                            }
                            className="bg-red-600 hover:bg-red-700"
                          >
                            {deleteMutation.isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              "حذف"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Stats */}
        {documents.length > 0 && (
          <Card className="mt-8">
            <CardContent className="py-4">
              <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
                <div>
                  <span className="font-semibold text-foreground">
                    {documents.length}
                  </span>{" "}
                  مستند محفوظ
                </div>
                {searchQuery && (
                  <div>
                    <span className="font-semibold text-foreground">
                      {filteredDocuments.length}
                    </span>{" "}
                    نتيجة بحث
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
