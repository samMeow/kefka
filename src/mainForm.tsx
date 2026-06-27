import { useFormik } from 'formik';
import { cloneElement } from 'preact/compat';
import type { VNode } from 'preact';

import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldContent, FieldLabel } from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import eye from '@/assets/eye.webp';
import plasma from '@/assets/plasma.webp';
import waterStack from '@/assets/water-stack.webp';
import explosion from '@/assets/explosion.webp';
import waterRing from '@/assets/water-ring.webp';
import fire from '@/assets/fire.webp';
import dead from '@/assets/dead.webp';
import alive from '@/assets/alive.webp';
import purple from '@/assets/purple.webp';
import blue from '@/assets/blue.webp';
import truth from '@/assets/truth.webp';
import fake from '@/assets/lie.webp';
import { cn } from './lib/utils';
import { useTranslation } from 'react-i18next';
import { Button } from './components/ui/button';

const ImageLabel = ({
  className,
  description,
  children,
}: {
  className?: string;
  description?: string;
  children?: VNode;
}) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center p-2 border-r-2',
      className,
    )}
  >
    {children && cloneElement(children, { className: 'w-12' })}
    {description && (
      <span className="font-semibold mt-1 text-md">{description}</span>
    )}
  </div>
);

const TruthFakeGroup = ({
  className,
  name,
  value,
  onChange,
}: {
  className?: string;
  name: string;
  value?: string | null;
  onChange: (name: string, value: string) => void;
}) => (
  <RadioGroup
    name={name}
    value={value}
    onValueChange={(v) => onChange(name, v)}
    className={className}
  >
    <Field className="p-2">
      <FieldLabel
        className="h-full h-full rounded-3xl overflow-hidden"
        htmlFor={`${name}-truth`}
      >
        <FieldContent className="flex h-full items-center justify-center p-2">
          <img className="w-25" src={truth} alt="truth" />
        </FieldContent>
        <RadioGroupItem value="truth" id={`${name}-truth`} className="hidden" />
      </FieldLabel>
    </Field>
    <Field className="p-2">
      <FieldLabel
        className="h-full rounded-3xl overflow-hidden"
        htmlFor={`${name}-fake`}
      >
        <FieldContent className="flex h-full items-center justify-center p-2">
          <img className="w-25" src={fake} alt="fake" />
        </FieldContent>
        <RadioGroupItem value="fake" id={`${name}-fake`} className="hidden" />
      </FieldLabel>
    </Field>
  </RadioGroup>
);

const Group = ({
  className,
  name,
  imgSrc,
  description,
  value,
  truthText,
  fakeText,
  onChange,
}: {
  className?: string;
  name: string;
  imgSrc: string;
  description: string;
  value?: string | null;
  truthText: string;
  fakeText: string;
  onChange: (name: string, value: string) => void;
}) => (
  <div
    className={cn(
      'grid grid-cols-4 odd:bg-background even:bg-muted',
      className,
    )}
  >
    <ImageLabel description={description}>
      <img src={imgSrc} alt={description} />
    </ImageLabel>
    <TruthFakeGroup
      className="col-span-2 grid grid-cols-subgrid"
      name={name}
      value={value}
      onChange={onChange}
    />
    <div className="flex items-center justify-center border-l-2">
      <span className="font-bold text-3xl">
        {value === 'truth' && truthText}
        {value === 'fake' && fakeText}
      </span>
    </div>
  </div>
);

const MainForm = () => {
  const { t } = useTranslation();
  const { values, setFieldValue, handleSubmit, resetForm } = useFormik({
    initialValues: {
      firstSight: null,
      secondSight: null,
      waterStack: null,
      explosion: null,
      plasma: null,
      waterRing: null,
      fire: null,
      liveMark: null,
      beam: null,
    },
    onSubmit: () => {},
  });

  return (
    <form className="w-full md:w-300 my-4 m-auto" onSubmit={handleSubmit}>
      <div className="flex justify-end">
        <Button
          size="lg"
          className="mb-2 h-12 text-xl"
          onClick={() => resetForm()}
        >
          {t('reset')}
        </Button>
      </div>
      <Card>
        <CardContent className="p-0 m-0">
          <Group
            name="firstSight"
            imgSrc={eye}
            description={t('firstSight')}
            value={values.firstSight}
            truthText={t('dontLook')}
            fakeText={t('look')}
            onChange={setFieldValue}
          />
          <Group
            name="secondSight"
            imgSrc={eye}
            description={t('secondSight')}
            value={values.secondSight}
            truthText={t('dontLook')}
            fakeText={t('look')}
            onChange={setFieldValue}
          />
          <Group
            name="plasma"
            imgSrc={plasma}
            description={t('plasma')}
            value={values.plasma}
            truthText={t('stop')}
            fakeText={t('move')}
            onChange={setFieldValue}
          />
          <Group
            name="waterStack"
            imgSrc={waterStack}
            description={t('waterStack')}
            value={values.waterStack}
            truthText={t('group')}
            fakeText={t('alone')}
            onChange={setFieldValue}
          />
          <Group
            name="explosion"
            imgSrc={explosion}
            description={t('explosion')}
            value={values.explosion}
            truthText={t('alone')}
            fakeText={t('group')}
            onChange={setFieldValue}
          />

          <div className="grid grid-cols-4 bg-muted border-t-4 border-primary">
            <ImageLabel description={t('waterRing')}>
              <img src={waterRing} alt="water ring" />
            </ImageLabel>
            <TruthFakeGroup
              className="col-span-2 grid grid-cols-subgrid"
              name="waterRing"
              value={values.waterRing}
              onChange={setFieldValue}
            />
            <div className="flex items-center justify-center border-l-2">
              <span className="font-bold text-3xl">
                {values.waterRing === 'truth' && t('stay')}
                {values.waterRing === 'fake' && t('away')}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-4 bg-background">
            <ImageLabel description={t('fire')}>
              <img src={fire} alt="flame pillar" />
            </ImageLabel>
            <TruthFakeGroup
              className="col-span-2 grid grid-cols-subgrid"
              name="fire"
              value={values.fire}
              onChange={setFieldValue}
            />
            <div className="flex items-center justify-center border-l-2">
              <span className="font-bold text-3xl">
                {values.fire === 'truth' && t('away')}
                {values.fire === 'fake' && t('stay')}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 bg-muted border-t-4 border-primary">
            <div className="col-span-3 grid grid-cols-2">
              <div className="border-r-2">
                <RadioGroup
                  value={values.liveMark}
                  onValueChange={(v) => setFieldValue('liveMark', v)}
                  className="grid grid-cols-2 gap-0"
                >
                  <Field>
                    <FieldLabel
                      className="h-full h-full rounded-3xl overflow-hidden"
                      htmlFor="blue-alive"
                    >
                      <FieldContent className="flex h-full items-center gap-1 flex-row justify-center p-1">
                        <img className="w-12" src={blue} alt="blue" />
                        <img className="w-12" src={alive} alt="alive" />
                      </FieldContent>
                      <RadioGroupItem
                        value="blue-alive"
                        id="blue-alive"
                        className="hidden"
                      />
                    </FieldLabel>
                  </Field>
                  <Field className="border-l-1">
                    <FieldLabel
                      className="h-full h-full rounded-3xl overflow-hidden"
                      htmlFor="blue-dead"
                    >
                      <FieldContent className="flex h-full items-center gap-1 flex-row justify-center p-1">
                        <img className="w-12" src={blue} alt="blue" />
                        <img className="w-12" src={dead} alt="dead" />
                      </FieldContent>
                      <RadioGroupItem
                        value="blue-dead"
                        id="blue-dead"
                        className="hidden"
                      />
                    </FieldLabel>
                  </Field>
                  <Field className="border-t-1">
                    <FieldLabel
                      className="h-full h-full rounded-3xl overflow-hidden"
                      htmlFor="purple-alive"
                    >
                      <FieldContent className="flex h-full items-center gap-1 flex-row justify-center p-1">
                        <img className="w-12" src={purple} alt="purple" />
                        <img className="w-12" src={alive} alt="alive" />
                      </FieldContent>
                      <RadioGroupItem
                        value="purple-alive"
                        id="purple-alive"
                        className="hidden"
                      />
                    </FieldLabel>
                  </Field>
                  <Field className="border-l-1 border-t-1">
                    <FieldLabel
                      className="h-full h-full rounded-3xl overflow-hidden"
                      htmlFor="purple-dead"
                    >
                      <FieldContent className="flex h-full items-center gap-1 flex-row justify-center p-1">
                        <img className="w-12" src={purple} alt="purple" />
                        <img className="w-12" src={dead} alt="dead" />
                      </FieldContent>
                      <RadioGroupItem
                        value="purple-dead"
                        id="purple-dead"
                        className="hidden"
                      />
                    </FieldLabel>
                  </Field>
                </RadioGroup>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="font-bold text-lg">{t('beam')}</span>
                <TruthFakeGroup
                  className="grid grid-cols-2"
                  name="beam"
                  value={values.beam}
                  onChange={setFieldValue}
                />
              </div>
            </div>
            <div className="flex items-center justify-center border-l-2">
              <span className="font-bold text-3xl">
                {(() => {
                  if (values.liveMark === null || values.beam === null)
                    return undefined;
                  const isBlue = ['blue-dead', 'purple-alive'].includes(
                    values.liveMark,
                  );
                  const isTruth = values.beam === 'truth';
                  // xand
                  return isBlue === isTruth ? t('blue') : t('purple');
                })()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default MainForm;
