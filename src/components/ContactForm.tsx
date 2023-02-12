import { useState } from 'react';
import axios from 'axios';
import { ItemType } from './Item';
import { User } from '@prisma/client';
import Router from 'next/router';
import Select from 'react-select';
import Alert from './Alert';

type FormProps = {
  user: User;
  items: ItemType[];
};

const ContactForm = ({ user, items: sellerItems }: FormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [items, setItems] = useState(null);
  const [alertType, setAlertType] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const options = sellerItems.map((item) => {
    return { value: item.title, label: item.title };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemNames = items?.map((item) => item.value);
    try {
      axios.defaults.headers.post['Content-Type'] = 'application/json';
      await axios
        .post(`https://formsubmit.co/ajax/lmcsay@gmail.com`, {
          name,
          email,
          message,
          itemNames,
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      setName('');
      setEmail('');
      setMessage('');
      setItems(null);
      setShowAlert(true);
      setAlertType('success');
      await setTimeout(() => {
        setShowAlert(false);
        setAlertType('');
        Router.push('/');
      }, 3000);
    } catch (error) {
      setShowAlert(true);
      setAlertType('danger');
      await setTimeout(() => {
        setShowAlert(false);
        setAlertType('');
      }, 3000);
      console.error(error);
    }
  };

  return (
    <div className='form-center'>
      <div className='bg-gray-ish py-4 rounded'>
        <h3 className='text-xl tracking-wide mb-4 font-semibold'>
          Contact Form
        </h3>
        <p className='mb-4 px-8'>
          Let the seller know what you&#39;re interested in and they&#39;ll get
          back to you!
        </p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='w-8/12 mx-auto'>
            {showAlert && alertType === 'success' ? (
              <Alert message={'Email sent!'} alertType={alertType} />
            ) : (
              <Alert message={'There was an error'} alertType={alertType} />
            )}
          </div>
          <input
            className='form-input'
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className='form-input'
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            className='form-input mb-4'
            placeholder='Leave a message'
            name='message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div className='flex-col w-8/12 mx-auto'>
            <div>
              <label htmlFor='yard-items mb-2'>
                Select item(s) of interest:
              </label>
            </div>
            <Select
              className='mt-4'
              isMulti
              defaultValue={items}
              onChange={setItems}
              options={options}
            />
          </div>
          <button className='block mx-auto btn btn-primary mt-10' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
