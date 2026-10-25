import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { adminOnlyDeleteAction, saveUserNoteAction } from '@/actions/userActions';
import { auth } from '@/auth';

type IDashboardPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ msg?: string; error?: string }>;
};

export async function generateMetadata() {
  return {
    title: 'Dashboard - Phan quyen User va Admin',
  };
}

export default async function Dashboard(props: IDashboardPageProps) {
  const { locale } = await props.params;
  const search = await props.searchParams;
  setRequestLocale(locale);

  const session = await auth();

  if (!session || !session.user) {
    redirect('/sign-in');
  }

  return (
    <div className="py-5">
      <h1 className="mb-4 text-2xl font-bold">Trang Dashboard (Lớp 2: Đã kiểm tra Session tại Page)</h1>

      {search.error && (
        <div className="mb-4 rounded border border-red-600 bg-red-100 p-3 text-base text-red-800">
          {search.error}
        </div>
      )}

      {search.msg && (
        <div className="mb-4 rounded border border-green-600 bg-green-100 p-3 text-base text-green-800">
          {search.msg}
        </div>
      )}

      <div className="mb-6 rounded border border-gray-300 p-4">
        <p className="font-bold">Thông tin phiên đăng nhập (TypeScript Session):</p>
        <p>
          ID:
          {' '}
          {session.user.id}
        </p>
        <p>
          Họ tên:
          {' '}
          {session.user.name}
        </p>
        <p>
          Email:
          {' '}
          {session.user.email}
        </p>
        <p>
          Vai trò (Role):
          {' '}
          <span className="rounded bg-blue-600 px-2 py-1 text-sm font-bold text-white">
            {session.user.role}
          </span>
        </p>
      </div>

      <div className="mb-6 rounded border border-gray-300 p-4">
        <h2 className="mb-2 text-lg font-bold">1. Chức năng cho cả User và Admin (Ghi chú cá nhân)</h2>
        <form action={saveUserNoteAction} className="flex gap-2">
          <input
            name="note"
            type="text"
            required
            placeholder="Nhập nội dung ghi chú..."
            defaultValue="Em nộp bài tập tuần 8"
            className="flex-1 rounded border border-gray-400 px-3 py-2 text-base"
          />
          <button
            type="submit"
            className="rounded bg-green-600 px-4 py-2 text-base font-bold text-white hover:bg-green-700"
          >
            Lưu ghi chú (Server Action)
          </button>
        </form>
      </div>

      <div className="mb-6 rounded border border-gray-300 p-4">
        <h2 className="mb-2 text-lg font-bold">2. Kiểm tra phân quyền Lớp 3 (Server Action chỉ dành cho Admin)</h2>
        <p className="mb-3 text-sm text-gray-600">
          Nếu đang đăng nhập bằng tài khoản user, bấm nút bên dưới sẽ bị Lớp 3 (Server Action) chặn lại.
        </p>
        <form action={adminOnlyDeleteAction}>
          <input type="hidden" name="studentId" value="SV99" />
          <button
            type="submit"
            className="rounded bg-red-600 px-4 py-2 text-base font-bold text-white hover:bg-red-700"
          >
            Thử gọi Server Action Xóa Sinh Viên (Yêu cầu quyền Admin)
          </button>
        </form>
      </div>

      <div className="rounded border border-gray-300 p-4">
        <h2 className="mb-2 text-lg font-bold">3. Kiểm tra phân quyền trang Admin (Lớp 1 Middleware & Lớp 2 Page)</h2>
        <Link
          href="/admin"
          className="inline-block rounded bg-blue-600 px-4 py-2 text-base font-bold text-white hover:bg-blue-700"
        >
          Đi tới trang quản trị /admin
        </Link>
      </div>
    </div>
  );
}
