'use server';

import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export async function saveUserNoteAction(formData: FormData) {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/sign-in');
  }

  if (session.user.role !== 'user' && session.user.role !== 'admin') {
    redirect('/dashboard?error=Khong+co+quyen+thuc+hien');
  }

  const note = String(formData.get('note') ?? '').trim();
  const message = encodeURIComponent(`Lớp 3 (Server Action) thành công: Đã lưu ghi chú "${note}" với quyền ${session.user.role}`);
  redirect(`/dashboard?msg=${message}`);
}

export async function adminOnlyDeleteAction(formData: FormData) {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/sign-in');
  }

  if (session.user.role !== 'admin') {
    const errorMsg = encodeURIComponent('Lớp 3 (Server Action) chặn: Bạn đang là user thường, chỉ admin mới được xóa dữ liệu!');
    redirect(`/dashboard?error=${errorMsg}`);
  }

  const studentId = String(formData.get('studentId') ?? 'SV01');
  const successMsg = encodeURIComponent(`Lớp 3 (Server Action) thành công: Admin ${session.user.email} đã xóa sinh viên mã ${studentId}`);
  redirect(`/admin?msg=${successMsg}`);
}
