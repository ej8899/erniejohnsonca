import { FormEvent, useEffect, useRef, useState } from 'react';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [emailValidation, setEmailValidation] = useState(' ');
  const [name, setName] = useState('');
  const [nameValidation, setNameValidation] = useState(' ');
  const [message, setMessage] = useState('');
  const [messageValidation, setMessageValidation] = useState(' ');
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [isSendPending, setIsSendPending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);

  const isValidEmail = () => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email) ? true : false;
  };

  const isValidName = () => {
    return name.trim().length >= 2 ? true : false;
  };

  const isValidMessage = () => {
    return message.trim().length >= 15 ? true : false;
  };

  // validate fields when a value changes
  useEffect(() => {
    if (!email || isValidEmail()) setEmailValidation('validated_input');
    else setEmailValidation('A valid e-mail address is required. Example: joe@gmail.com');

    if (!name || isValidName()) setNameValidation('validated_input');
    else setNameValidation('Names must be at least 2 characters long');

    if (!message || isValidMessage()) setMessageValidation('validated_input');
    else setMessageValidation('Messages must be at least 15 characters long');

    if (isValidEmail() && isValidMessage() && isValidName()) setIsFormValidated(true);
    else setIsFormValidated(false);
  }, [email, name, message]);

  // create a submit using a href
  const formRef = useRef(null);
  const formButton = () => {
      //$('#cform').submit(); 
      
      if(formRef.current) {
        alert("handling submit button")
        //formRef.current.submit();
        const submitEvent = new Event('submit', { bubbles: true });
        formRef.current.dispatchEvent(submitEvent);
      }
      return false;
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    alert("in submission process")
    if (!isFormValidated) return;
    setIsSendPending(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '7160e73c-4a32-4952-ab02-e07ea131ed58',
          from_name: 'erniejohnson.ca',
          subject: 'erniejohnson.ca - contact form response',
          message,
          name,
          email,
          botcheck: '',
        }),
      });
      const json = (await response.json());

      setIsSendPending(false);

      if (!json.success) throw new Error('Something went wrong.');

      setIsSent(true);
    } catch (err) {
      setIsSendPending(false);
      setIsError(true);
    }
  };

  return (
    <section className="lui-section lui-gradient-bottom" id="contact-section">
    {/* Heading */}
    <div className="lui-heading">
      <div className="container">
        <div className="m-titles align-center">
          <h2
            className="m-title splitting-text-anim-1 scroll-animate"
            data-splitting="words"
            data-animate="active"
          >
            <span> Contact Me </span>
          </h2>
          <div
            className="m-subtitle splitting-text-anim-1 scroll-animate"
            data-splitting="words"
            data-animate="active"
          >
            <span>
              {" "}
              Let’s <b>Talk About Ideas</b>
            </span>
          </div>
        </div>
      </div>
    </div>
    {/* Contact */}
    <div className="lui-contacts v-line v-line-left">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
            <div className="numbers-items">
              <div
                className="numbers-item scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="icon">
                  <i aria-hidden="true" className="far fa-map" />
                </div>
                <div className="title">
                  <span> Address </span>
                </div>
                <div className="lui-text">
                  <span> Remote (Canada & USA) </span>
                </div>
              </div>
              <div
                className="numbers-item scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="icon">
                  <i aria-hidden="true" className="far fa-user" />
                </div>
                <div className="title">
                  <span> Freelance </span>
                </div>
                <div className="lui-text">
                  <span> Available Right Now </span>
                </div>
              </div>
              <div
                className="numbers-item scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="icon">
                  <i aria-hidden="true" className="far fa-envelope" />
                </div>
                <div className="title">
                  <span> Email </span>
                </div>
                <div className="lui-text">
                  <span> ernie@erniejohnson.ca </span>
                </div>
              </div>
              <div
                className="numbers-item scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="icon">
                  <i aria-hidden="true" className="far fa-address-book" />
                </div>
                <div className="title">
                  <span> Phone </span>
                </div>
                <div className="lui-text">
                  <span> +1 705 - 331 - 8899 </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7">
            <div
              className="contacts-form scrolla-element-anim-1 scroll-animate"
              data-animate="active"
            >
              <div
                className="bg-img"
                style={{
                  backgroundImage: "url(assets/images/pat-1.png)",
                }}
              />
              
              <div className='contacts-form'> 
              {!isSendPending && !isSent && !isError && (
                <form onSubmit={(e) => handleFormSubmit(e)} 
                      id='cform'
                      noValidate
                      aria-label='contact'
                      ref={formRef}
                >
                  
                  <div className='row'>
                    <div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
                      <div className='group'>
                        <label>
                          Your Full Name <b>*</b>
                          <input 
                            type='text' 
                            name='name' 
                            id='name'
                            required
                            placeholder='John Doe'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`${name && nameValidation !== 'validated_input' ? 'invalid' : 'valid'}`}
                          />
                        </label>
                        <p className={`validation-message ${nameValidation === 'validated_input' ? 'visible' : ''}`}>
                          {nameValidation}
                        </p>
                      </div>
                    </div>
                    <div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
                      <div className='group'>
                        <label>
                          Your Email Address <b>*</b>
                          <input 
                            type='email'
                            name='email'
                            id='email'
                            required
                            placeholder='email@domain.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`${email && emailValidation !== 'validated_input' ? 'invalid' : 'valid'}`}
                          />
                        </label>
                        <p
                  className={`validation-message ${
                    emailValidation === 'validated_input' ? 'visible' : ''
                  }`}
                >
                  {emailValidation}
                </p>
                      </div>
                    </div>
                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                      <div className='group'>
                        <label>
                          Your Subject <b>*</b>
                          <input type='text' name='subject' />
                        </label>
                      </div>
                    </div>
                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                      <div className='group'>
                        <label>
                          Your Message <b>*</b>
                          <textarea 
                            name='message'
                            defaultValue={''}
                            id='message'
                            required
                            placeholder='Hi Ernie!'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className={`${
                              message && messageValidation !== 'validated_input' ? 'invalid' : 'valid'
                            }`}
                          />
                        </label>
                        <p
                  className={`validation-message ${
                    messageValidation === 'validated_input' ? 'invisible' : ''
                  }`}
                >
                  {messageValidation}
                </p>
                      </div>
                    </div>
                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 align-right'>
                      <div className='terms-label'>
                        * required
                      </div>
                      <a
                        href='#'
                        className='btn'
                        onClick={formButton}
                      >
                        <span>Send Message</span>
                      </a>
                    </div>
                  </div>
                </form>
              )}
          {/* animated hourglass */}
          {isSendPending && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='send-status pending'
              viewBox='0 0 24 24'
            >
              <path
                fill='var(--clr-neutral-500)'
                d='M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z'
                opacity='.5'
              />
              <path
                fill='currentColor'
                d='M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z'
                opacity='.75'
              >
                <animateTransform
                  attributeName='transform'
                  dur='2s'
                  from='0 12 12'
                  repeatCount='indefinite'
                  to='360 12 12'
                  type='rotate'
                />
              </path>
            </svg>
          )}

          {/* green checkmark icon */}
          {isSent && (
            <>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='send-status sent'
                viewBox='0 0 24 24'
              >
                <path
                  fill='var(--clr-success)'
                  d='m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4l4.25 4.25ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z'
                />
              </svg>
              <p>Thank you for reaching out!</p>
            </>
          )}
        

        {/* error during send */}
        {isError && (
          <>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='send-status error'
              viewBox='0 0 24 24'
            >
              <path
                fill='var(--clr-error)'
                d='M12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm0-4q.425 0 .713-.288T13 12V8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8v4q0 .425.288.713T12 13Zm0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z'
              />
            </svg>
            <p>
              Something went wrong. Email me directly at{' '}
              <a href='mailto:ernie@erniejohnson.ca'>ernie@erniejohnson.ca</a>
            </p>
          </>
        )}
                <div className='alert-success' style={{ display: 'none' }}>
                  <p>Thanks, your message is sent successfully.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='lui-bgtitle'>
          <span> Contact Me </span>
        </div>
      </div>
    </div>
    </section>
  )
};

export default Contact;