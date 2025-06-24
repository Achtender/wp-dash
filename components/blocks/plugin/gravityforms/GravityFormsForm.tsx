'use client';

import { createContext, useContext, useState } from 'react';

import { RenderBlock } from '@/components/craft-blocks';
import { Button } from '@/components/ui/button';

import CoreGroup from '@/components/blocks/core/CoreGroup';
import CoreButtons from '@/components/blocks/core/CoreButtons';

const FormResultContext = createContext<any>(undefined);
const FormSubmitContext = createContext<any>(undefined);

const GravityFormsForm = (self: RenderBlock) => {
  const [result, setResult] = useState<any>(null);
  const [submit, setSubmit] = useState<any>({
    pending: false,
  });

  if (!self.attrs.form) return;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setResult(null);
    setSubmit({ pending: true });

    fetch(`/api/forms/${self.attrs.form.id}/submissions`, {
      method: 'POST',
      body: formData,
    }).then(async (res) => {
      const json = await res.json();
      setResult({
        is_valid: json.is_valid,
        validation_messages: json.validation_messages,
        confirmation_type: json.confirmation_type,
        confirmation_message: json.confirmation_message,
      });
    }).finally(() => {
      setSubmit({ pending: false });
    });
  }

  const self_form_wrap = {
    ...form_wrap,
    attrs: {
      ...form_wrap.attrs,
      tagName: 'form',
      tagAttrs: {
        onSubmit: handleSubmit,
      },
    },
  };

  return (
    <CoreGroup {...self_form_wrap} className={form_styles.form}>
      <FormResultContext.Provider value={result}>
        <FormSubmitContext.Provider value={submit}>
          <CoreGroup {...group_wrap}>
            {self.attrs.form.fields.map((input: any, k: number) => (
              <ResolveInput input={input} key={k} />
            ))}
          </CoreGroup>

          <ResolveMessage />

          <CoreButtons {...group_wrap} {...button_wrap}>
            {[self.attrs.form.button].map((input: any, k: number) => (
              <ResolveButton input={input} key={k} />
            ))}
          </CoreButtons>
        </FormSubmitContext.Provider>
      </FormResultContext.Provider>
    </CoreGroup>
  );
};

const form_styles = {
  form: '',
  input:
    'h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  validationMessages:
    'text-sm text-red-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  label:
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  label_hidden: 'sr-only',
  legend:
    'mb-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
};

const form_wrap = {
  blockName: 'core/group',
  innerBlocks: [],
  attrs: {
    layout: {
      type: 'flex',
      orientation: 'vertical',
      // align: 'start'
    },
  },
  ctx: {},
  innerHTML: '',
  innerContent: [],
};

const group_wrap = {
  blockName: 'core/group',
  innerBlocks: [],
  attrs: {
    layout: {
      type: 'grid',
      columnCount: 1,
      // flexWrap: 'wrap',
      // justifyContent: 'left',
    },
  },
  ctx: {},
  innerHTML: '',
  innerContent: [],
};

const button_wrap = {
  attrs: {
    layout: {
      type: 'flex',
      justifyContent: 'right',
    },
  },
};

function ResolveField({ group }: { group: any }) {
  const result = useContext(FormResultContext);

  const styles: string[] = [
    'flex',
    'flex-col',
    'flex-nowrap',
    'gap-2',
    group.size === 'large' ? 'w-full' : '',
    group.size === 'medium' ? 'w-[50%]' : '',
  ].filter(Boolean);

  const styles_wrap: string[] = [
    'flex',
    'flex-row',
    'flex-wrap',
    'gap-2',
  ];

  return (
    <fieldset className={styles.join(' ')}>
      <legend className={form_styles.legend}>{group.label}</legend>
      <div className={styles_wrap.join(' ')}>
        {group.inputs?.map((input: any, idx: number) => (
          <ResolveInput input={input} key={idx} group={group} />
        ))}
      </div>
      {result?.validation_messages?.[group.id] && (
        <span className={form_styles.validationMessages}>
          {result.validation_messages[group.id]}
        </span>
      )}
    </fieldset>
  );
}

function ResolveInput(
  { input, group }: { input: any; group?: any },
) {
  const result = useContext(FormResultContext);
  const submit = useContext(FormSubmitContext);

  if (!input.type) {
    return <ResolveField group={input} />;
  }
  if (input.isHidden) {
    return null;
  }

  const styles: string[] = [
    'flex',
    'flex-col',
    'gap-2',
    input.size === 'large' ? 'w-full' : '',
    input.size === 'medium' ? 'w-[50%]' : 'flex-1',
  ].filter(Boolean);

  const style_label = group?.subLabelPlacement !== 'hidden_label'
    ? form_styles.label
    : form_styles.label_hidden;

  let input_wrap;

  switch (input.type) {
    case 'textarea':
      input_wrap = (
        <textarea
          disabled={submit?.pending || result?.is_valid}
          name={`input_${input.id}`}
          className={form_styles.input}
          // type={input.type}
        />
      );
      break;
    case 'consent':
      input_wrap = (
        <label className='flex flex-row items-center gap-2'>
          <input
            type='checkbox'
            name={`input_${input.id}`}
            disabled={submit?.pending || result?.is_valid}
            // className={form_styles.input}
          />
          {input.checkboxLabel}
        </label>
      );
      break;
    case 'select':
      input_wrap = (
        <select
          disabled={submit?.pending || result?.is_valid}
          name={`input_${input.id}`}
          className={form_styles.input}
          defaultValue=''
        >
          <option value='' disabled>
            {input.placeholder || 'Select an option'}
          </option>
          {input.choices?.map((choice: any, idx: number) => (
            <option key={idx} value={choice.value}>
              {choice.text}
            </option>
          ))}
        </select>
      );
      break;
    case 'website':
    default:
      input_wrap = (
        <input
          disabled={submit?.pending || result?.is_valid}
          name={`input_${input.id}`}
          className={form_styles.input}
          type={input.type}
        />
      );
      break;
  }

  return (
    <div className={styles.join(' ')}>
      <label htmlFor={`input_${input.id}`} className={style_label}>
        {input.label}
        {input.isRequired && '*'}
      </label>
      {input_wrap}
      {group?.subLabelPlacement !== 'hidden_label' &&
        result?.validation_messages?.[input.id] && (
        <span className={form_styles.validationMessages}>
          {result.validation_messages[input.id]}
        </span>
      )}
    </div>
  );
}

function ResolveButton({ input }: { input: any }) {
  const submit = useContext(FormSubmitContext);
  const result = useContext(FormResultContext);

  return (
    <Button
      disabled={submit?.pending || result?.is_valid}
      type='submit'
      variant='outline'
    >
      {input.text} {submit?.pending}
    </Button>
  );
}
function ResolveMessage() {
  const result = useContext(FormResultContext);

  if (!result?.is_valid) return null;

  const message = result?.confirmation_message?.match(
    /<div[^>]*class=['"][^'"]*gform_confirmation_message[^'"]*['"][^>]*>(.*?)<\/div>/,
  )?.[1] || '';

  return (
    <p>
      {message}
    </p>
  );
}

export default GravityFormsForm;
