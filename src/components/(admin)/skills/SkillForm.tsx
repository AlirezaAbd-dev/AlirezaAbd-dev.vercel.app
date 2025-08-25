import skillValidation, {
  SkillValidationType,
} from '@/validations/(admin)/SkillValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

const SkillForm = () => {
  const { control, handleSubmit } = useForm<SkillValidationType>({
    resolver: zodResolver(skillValidation),
  });

  function submitHandler(value: SkillValidationType) {
    console.log(value);
  }

  return (
    <Box
      onSubmit={handleSubmit(submitHandler)}
      display={'flex'}
      flexDirection={'column'}
      mt={8}
      component={'form'}
      width={'100%'}
    >
      <Typography variant='h6'>افزودن مهارت جدید</Typography>

      <Controller
        control={control}
        name='name'
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label='نام مهارت'
            variant='outlined'
            sx={{ mt: 2, mb: 2, width: '300px' }}
            onChange={(e) => field.onChange(e.target.value)}
            onBlur={field.onBlur}
            value={field.value}
            helperText={fieldState.error?.message}
            error={!!fieldState.error}
          />
        )}
      />
      <Controller
        control={control}
        name='value'
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label='میزان مهارت (0 تا 100)'
            variant='outlined'
            type='number'
            sx={{ mb: 2, width: '300px' }}
            onChange={(e) => field.onChange(e.target.value)}
            onBlur={field.onBlur}
            value={field.value}
            helperText={fieldState.error?.message}
            error={!!fieldState.error}
          />
        )}
      />
      <Controller
        control={control}
        name='icon'
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label='آیکون (لینک تصویر)'
            variant='outlined'
            sx={{ mb: 2, width: '300px' }}
            onChange={(e) => field.onChange(e.target.value)}
            onBlur={field.onBlur}
            value={field.value}
            helperText={fieldState.error?.message}
            error={!!fieldState.error}
          />
        )}
      />
      <Controller
        control={control}
        name='color'
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label='رنگ (کد رنگی)'
            variant='outlined'
            sx={{ mb: 2, width: '300px' }}
            onChange={(e) => field.onChange(e.target.value)}
            onBlur={field.onBlur}
            value={field.value}
            helperText={fieldState.error?.message}
            error={!!fieldState.error}
          />
        )}
      />
      <Button
        variant='contained'
        type='submit'
        sx={{ width: '150px', mt: 2 }}
      >
        افزودن
      </Button>
    </Box>
  );
};

export default SkillForm;
