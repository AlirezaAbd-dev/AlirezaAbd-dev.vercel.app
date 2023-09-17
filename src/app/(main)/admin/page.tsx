import { Box, Button, Card, TextField, Typography } from '@mui/material';

const AdminPanel = () => {
   return (
      <Card
         sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'flex-end',
            width: '100%',
            height: '100vh',
            p: 5,
            overflowY: 'scroll',
         }}
      >
         <Box
            width={'100%'}
            textAlign={'center'}
         >
            <Typography variant='h5'>پنل ادمین</Typography>
         </Box>

         <TextField
            dir='rtl'
            color='secondary'
            label='نام و نام خانوادگی'
         />
         <TextField
            dir='rtl'
            color='secondary'
            label='سال تولد'
            type='number'
         />
         <TextField
            dir='rtl'
            color='secondary'
            label='شهر'
         />
         <TextField
            dir='rtl'
            color='secondary'
            label='ایمیل'
         />
         <Button variant='contained'>تایید</Button>

         {/* -------------------------------------------------------- */}

         <Typography variant='h6'>اضافه کردن معرفی</Typography>

         <TextField
            dir='rtl'
            color='secondary'
            label='از خودت کوتاه تعریف کن'
            sx={{ width: '80%' }}
         />

         <Button variant='contained'>اضافه کردن</Button>

         {/* -------------------------------------------------------- */}

         <Typography variant='h6'>اضافه کردن مهارت</Typography>

         <TextField
            dir='rtl'
            color='secondary'
            label='مهارت'
         />

         <Button variant='contained'>اضافه کردن</Button>

         {/* -------------------------------------------------------- */}

         <Typography variant='h6'>اضافه کردن تحصیلات</Typography>

         <TextField
            dir='rtl'
            color='secondary'
            label='مدرک'
         />
         <TextField
            dir='rtl'
            color='secondary'
            label='از سال'
         />
         <TextField
            dir='rtl'
            color='secondary'
            label='تا سال'
         />
         <TextField
            dir='rtl'
            color='secondary'
            label='رشته'
         />
         <TextField
            dir='rtl'
            color='secondary'
            label='محل تحصیل'
         />

         <Button variant='contained'>اضافه کردن</Button>

         {/* -------------------------------------------------------- */}

         <Typography variant='h6'>اضافه کردن نمونه کار</Typography>

         <TextField
            dir='rtl'
            color='secondary'
            label='نام پروژه'
         />
         <TextField
            dir='rtl'
            color='secondary'
            label='آدرس عکس'
         />
         <TextField
            dir='rtl'
            color='secondary'
            label='لینک رفرنس'
         />

         <Button variant='contained'>اضافه کردن</Button>
      </Card>
   );
};

export default AdminPanel;
