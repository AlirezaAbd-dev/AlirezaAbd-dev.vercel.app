import dynamic from 'next/dynamic';
const AdminPanel = dynamic(() => import('@/components/admin/AdminPanel'), {
   ssr: false,
});

const AdminPanelPage = () => {
   return <AdminPanel />;
};

export default AdminPanelPage;
