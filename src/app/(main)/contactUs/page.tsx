import { type Metadata } from 'next';
import MainContactUs from '@/components/contact/MainContactUs';

export const metadata: Metadata = {
   title: 'علیرضا عابدی | ارتباط با من',
   description:
      'توسط این صفحه میتوانید به نشانی الکترونیکی بنده پیان ارسال کنید و نظرات خود را برای من بفرستید.',
};

const Contact = () => {
   return <MainContactUs />;
};

export default Contact;
