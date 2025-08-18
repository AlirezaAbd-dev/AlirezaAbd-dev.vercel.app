'use client';

import loginValidation, {
  LoginValidationType,
} from '@/validations/loginValidation';
import { Box, Button, Card, Input, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const Login = () => {
  const { control, handleSubmit } = useForm<LoginValidationType>({
    resolver: zodResolver(loginValidation),
  });

  const submitHandler = (data: LoginValidationType) => {
    console.log('Login data:', data);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Card
        sx={{
          py: 6,
          px: 4,
          width: '300px',
          borderRadius: '16px',
        }}
      >
        <Typography
          variant='h4'
          color='primary.main'
          textAlign='center'
          mb={6}
        >
          ورود
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(submitHandler)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Controller
            control={control}
            name='username'
            render={({ field, fieldState }) => (
              <>
                <Input
                  type='text'
                  placeholder='نام کاربری'
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={fieldState.invalid}
                  value={field.value}
                  name='username'
                  dir='rtl'
                />
                {fieldState.error && (
                  <Typography
                    color='error.main'
                    variant='caption'
                    textAlign={'left'}
                  >
                    {fieldState.error.message}
                  </Typography>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name='password'
            render={({ field, fieldState }) => (
              <>
                <Input
                  type='password'
                  placeholder='رمز عبور'
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={fieldState.invalid}
                  value={field.value}
                  name='password'
                  dir='rtl'
                />
                {fieldState.error && (
                  <Typography
                    color='error.main'
                    variant='caption'
                    textAlign={'left'}
                  >
                    {fieldState.error.message}
                  </Typography>
                )}
              </>
            )}
          />
          <Button
            type='submit'
            variant='contained'
            sx={{
              mt: '40px',
            }}
          >
            ورود
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default Login;
