import useAddSkillMutation from '@/services/(admin)/skills/useAddSkillMutation';
import useEditSkillMutation from '@/services/(admin)/skills/useEditSkillMutation';
import { Skill } from '@/services/aboutMe/useSkillsQuery';
import skillValidation, {
  SkillValidationType,
} from '@/validations/(admin)/SkillValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

type Props = {
  mode?: 'add' | 'edit';
  skill?: Skill;
  onCloseDialog?: () => void;
};

const SkillForm = ({ mode = 'add', ...props }: Props) => {
  const { control, handleSubmit, setValue } = useForm<SkillValidationType>({
    resolver: zodResolver(skillValidation),
  });

  const { mutate, isPending, isSuccess } = useAddSkillMutation();
  const {
    mutate: editMutate,
    isPending: editIsPending,
    isSuccess: editIsSuccess,
  } = useEditSkillMutation();

  function submitHandler(value: SkillValidationType) {
    if (mode === 'add') mutate(value);
    else {
      if (props.skill) editMutate({ id: props.skill.id, ...value });
    }
  }

  useEffect(() => {
    if (mode === 'edit' && props.skill) {
      setValue('name', props.skill.name);
      setValue('color', props.skill.color);
      setValue('icon', props.skill.icon);
      setValue('value', props.skill.value);
    }
  }, [props.skill, mode]);

  useEffect(() => {
    if ((!isPending && isSuccess) || (!editIsPending && editIsSuccess)) {
      if (props.onCloseDialog) props.onCloseDialog();
      setValue('name', '');
      setValue('color', '');
      setValue('icon', '');
      setValue('value', 0);
    }
  }, [isPending, isSuccess, editIsPending, editIsSuccess]);

  return (
    <Box
      onSubmit={handleSubmit(submitHandler)}
      display={'flex'}
      flexDirection={'column'}
      mt={mode === 'add' ? 8 : 0}
      component={'form'}
      width={'100%'}
    >
      {mode === 'add' && (
        <Typography variant='h6'>افزودن مهارت جدید</Typography>
      )}

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
        loading={isPending}
        disabled={isPending}
      >
        {mode === 'edit' ? 'ویرایش' : 'افزودن'}
      </Button>
    </Box>
  );
};

export default SkillForm;
