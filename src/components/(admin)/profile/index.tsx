import useEditProfileMutation from '@/services/(admin)/profile/useEditProfileMutation';
import { Profile } from '@/services/main/useProfileQuery';
import profileValidation, {
  ProfileValidationType,
} from '@/validations/(admin)/profileValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Card, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

type Props = {
  profile: Profile;
};

const ProfileMain = (props: Props) => {
  const { mutate, isPending } = useEditProfileMutation();

  const { control, handleSubmit } = useForm<ProfileValidationType>({
    defaultValues: props.profile,
    resolver: zodResolver(profileValidation),
  });

  function submitHandler(value: ProfileValidationType) {
    mutate(value);
  }

  return (
    <Card
      sx={{
        width: '100%',
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <Box
        dir='rtl'
        width={'100%'}
        px={8}
        py={8}
      >
        <Typography variant='h5'>پروفایل</Typography>
        <Box
          component={'form'}
          mt={4}
          width={'100%'}
          onSubmit={handleSubmit(submitHandler)}
        >
          <Controller
            control={control}
            name='fullname'
            render={({ field, fieldState }) => (
              <TextField
                placeholder='نام و نام خانوادگی'
                sx={{ width: '100%' }}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                helperText={fieldState.error?.message}
                error={!!fieldState.error}
              />
            )}
          />
          <Controller
            control={control}
            name='email'
            render={({ field, fieldState }) => (
              <TextField
                placeholder='ایمیل'
                type='email'
                sx={{ width: '100%', mt: 2 }}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                helperText={fieldState.error?.message}
                error={!!fieldState.error}
              />
            )}
          />
          <Controller
            control={control}
            name='avatar'
            render={({ field, fieldState }) => (
              <TextField
                placeholder='تصویر پروفایل'
                type='url'
                sx={{ width: '100%', mt: 2 }}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                helperText={fieldState.error?.message}
                error={!!fieldState.error}
              />
            )}
          />
          <Controller
            control={control}
            name='birthCity'
            render={({ field, fieldState }) => (
              <TextField
                placeholder='شهر تولد'
                sx={{ width: '100%', mt: 2 }}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                helperText={fieldState.error?.message}
                error={!!fieldState.error}
              />
            )}
          />
          <Controller
            control={control}
            name='birthday'
            render={({ field, fieldState }) => (
              <TextField
                placeholder='تاریخ تولد'
                sx={{ width: '100%', mt: 2 }}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                helperText={fieldState.error?.message}
                error={!!fieldState.error}
              />
            )}
          />
          <Controller
            control={control}
            name='telegramUrl'
            render={({ field, fieldState }) => (
              <TextField
                placeholder='آدرس تلگرام'
                sx={{ width: '100%', mt: 2 }}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                helperText={fieldState.error?.message}
                error={!!fieldState.error}
              />
            )}
          />
          <Controller
            control={control}
            name='instagramUrl'
            render={({ field, fieldState }) => (
              <TextField
                placeholder='آدرس اینستاگرام'
                sx={{ width: '100%', mt: 2 }}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                helperText={fieldState.error?.message}
                error={!!fieldState.error}
              />
            )}
          />
          <Controller
            control={control}
            name='githubUrl'
            render={({ field, fieldState }) => (
              <TextField
                placeholder='آدرس گیتهاب'
                sx={{ width: '100%', mt: 2 }}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                helperText={fieldState.error?.message}
                error={!!fieldState.error}
              />
            )}
          />
          <Button
            sx={{ mt: 4 }}
            type='submit'
            variant='contained'
            loading={isPending}
          >
            ویرایش
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default ProfileMain;
