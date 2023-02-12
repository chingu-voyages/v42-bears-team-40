const Footer = () => {
  return (
    <div className='bg-dark-green text-gray-100 h-16 w-full flex justify-center items-center'>
      <h5>
        &copy; {new Date().getFullYear()}
        <span className='text-light-green mx-2'>Yard Sale</span>
      </h5>
      <h5>All rights reserved</h5>
    </div>
  );
};

export default Footer;
