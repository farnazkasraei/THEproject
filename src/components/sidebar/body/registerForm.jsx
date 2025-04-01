// dont use form library, do it by yourself
// so you have to build form, validate it, and submit it
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '@/store/slices/users';
import { toggleSideBar } from '@/store/slices/sideBar';
import P from '@/components/translate';
import { useSelector } from 'react-redux';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dob: z.date(),
  gender: z.enum(['male', 'female', 'other']),
  email: z.string().email('Invalid email address'),
  uni: z.string().min(2, 'University name must be at least 2 characters'),
  bio: z.string().max(300, 'Bio must be under 300 characters'),
  id: z.number(),
});

const genderOptions = ['male', 'female', 'other'];

export default function RegisterForm({ type }) {
  console.log('*** ~ RegisterForm ~ type:', type);
  const dispatch = useDispatch();
  const user = useSelector(state => state.users?.user);
  console.log('*** ~ RegisterForm ~ user:', user);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: type === 'update' ? user.name : '',
      lastName: type === 'update' ? user.lastName : '',
      dob: type === 'update' ? user.dob : '',
      gender: type === 'update' ? user.gender : '',
      uni: type === 'update' ? user.uni : '',
      bio: type === 'update' ? user.bio : '',
      email: type === 'update' ? user.email : '',
      id: type === 'update' ? user.id : 0,
    },
  });

  function onSubmit(values) {
    const randomId = Math.floor(Math.random() * 1000000);
    const userWithId = { ...values, id: randomId };
    if (type === 'update') {
      dispatch(updateUser(form.getValues()));
    } else {
      dispatch(addUser(userWithId));
    }
    dispatch(toggleSideBar('menu'));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 p-4 border rounded-lg shadow-md'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <P translate>name</P>
              </FormLabel>
              <FormControl>
                <Input placeholder='John' {...field} />
              </FormControl>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <P translate>lastName</P>
              </FormLabel>
              <FormControl>
                <Input placeholder='Doe' {...field} />
              </FormControl>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='dob'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <P translate>dob</P>
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant='outline' className='w-full justify-start'>
                    {field.value ? format(field.value, 'PPP') : <P translate>pick a date</P>}
                    <CalendarIcon className='ml-2 h-4 w-4' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='bg-white dark:bg-gray-800 shadow-lg border rounded-md p-2'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    className='bg-white text-gray-900'
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <P translate>email</P>
              </FormLabel>
              <FormControl>
                <Input placeholder='john@example.com' {...field} />
              </FormControl>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='gender'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <P translate>gender</P>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder={<P translate>select gender</P>} />
                </SelectTrigger>
                <SelectContent className='bg-white'>
                  {genderOptions.map(option => (
                    <SelectItem className='hover:bg-slate-400' value={option}>
                      <P translate>{option}</P>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='uni'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <P translate>uni</P>
              </FormLabel>
              <FormControl>
                <Input placeholder='Your University' {...field} />
              </FormControl>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <P translate>bio</P>
              </FormLabel>
              <FormControl>
                <Textarea placeholder='tell us about yourself' {...field} />
              </FormControl>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />

        <Button type='submit' variant='outline' className=' justify-start border-black'>
          <P translate>{type === 'update' ? 'Update' : 'Register'}</P>
        </Button>
      </form>
    </Form>
  );
}
