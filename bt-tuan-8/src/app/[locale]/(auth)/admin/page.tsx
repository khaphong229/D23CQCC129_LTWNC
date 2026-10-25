import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { adminOnlyDeleteAction } from '@/actions/userActions';
import { auth } from '@/auth';

type IAdminPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ msg?: string }>;
};

export async function generateMetadata() {
  return {
    title: 'Trang Quan Tri Admin',
  };
}

const sampleStudents = [
  { id: 'SV01', name: 'Nguyen Van A', className: 'D23CQCC01' },
  { id: 'SV02', name: 'Tran Thi B', className: 'D23CQCC02' },
  { id: 'SV03', name: 'Le Van C', className: 'D23CQCC03' },
];

export default async function AdminPage(props: IAdminPageProps) {
  const { locale } = await props.params;
  const search = await props.searchParams;
  setRequestLocale(locale);

  const session = await auth();

  if (!session || !session.user) {
    redirect('/sign-in');
  }

  if (session.user.role !== 'admin') {
    return (
      <div className="mx-auto max-w-xl p-8 text-center">
        <h1 className="mb-3 text-2xl font-bold text-red-600">
          Lớp 2 (Page): Từ chối truy cập!
        </h1>
        <p className="mb-4">
          Tài khoản của bạn có vai trò là
          {' '}
          <b>{session.user.role}</b>
          , chỉ có
          {' '}
          <b>admin</b>
          {' '}
          mới được xem trang này.
        </p>
        <Link href="/dashboard" className="rounded bg-blue-600 px-4 py-2 text-white">
          Quay về Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Trang Quản Trị Admin (Chỉ Role Admin)</h1>
        <Link href="/dashboard" className="rounded bg-gray-700 px-3 py-2 text-sm text-white">
          Về Dashboard
        </Link>
      </div>

      <p className="mb-4 text-sm text-gray-400">
        Xin chào Admin:
        {' '}
        <b>{session.user.name}</b>
        {' '}
        (
        {session.user.email}
        ) - Vai trò:
        {' '}
        <b>{session.user.role}</b>
      </p>

      {search.msg && (
        <div className="mb-4 rounded border border-green-600 bg-green-100 p-3 text-green-800">
          {search.msg}
        </div>
      )}

      <div className="rounded border border-gray-600 p-4">
        <h2 className="mb-3 text-lg font-bold">Danh sách sinh viên mẫu (Test Server Action Lớp 3)</h2>
        <table className="w-full border-collapse border border-gray-600 text-left text-sm">
          <thead>
            <tr className="border-b border-gray-600 bg-gray-800 text-white">
              <th className="p-2">Mã SV</th>
              <th className="p-2">Họ tên</th>
              <th className="p-2">Lớp</th>
              <th className="p-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {sampleStudents.map(sv => (
              <tr key={sv.id} className="border-b border-gray-700">
                <td className="p-2">{sv.id}</td>
                <td className="p-2">{sv.name}</td>
                <td className="p-2">{sv.className}</td>
                <td className="p-2">
                  <form action={adminOnlyDeleteAction}>
                    <input type="hidden" name="studentId" value={sv.id} />
                    <button
                      type="submit"
                      className="rounded bg-red-600 px-3 py-1 text-xs font-bold text-white hover:bg-red-700"
                    >
                      Xóa SV
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
