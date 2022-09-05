import classes from './form.module.css';
import { useState, useEffect } from 'react';
import Notification from '../../../../global/notifications';
    
function Formsection(){
    
        const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
        const [requestError, setRequestError] = useState();   
        const [enteredEmail, setEnteredEmail] = useState('');
        const [enteredName, setEnteredName] = useState('');
        const [enteredPhone, setEnteredPhone] = useState('');
        const [enteredCompanyname, setEnteredCompanyname] = useState('');
        const [enteredCompanywebsite, setEnteredCompanywebsite] = useState('');
        const [enteredMessage, setEnteredMessage] = useState('');
    
        // const [formState, setFormState] = useState({
        //     name: '',
        //     email: '',
        //     phone: '',
        //     companyname: '',
        //     companywebsite: '',
        //     message: '',
    
        //   })
    
          useEffect(() => {
            if (requestStatus === 'success' || requestStatus === 'error') {
              const timer = setTimeout(() => {
                setRequestStatus(null);
                setRequestError(null);
              }, 3000);
        
              return () => clearTimeout(timer);
            }
          }, [requestStatus]);
    
        
          const handleContactFormSubmit = async (e) => {
            e.preventDefault()
            // const { name, email, phone, companyname, companywebsite, message } = formState
            // if (name && email) {
    
            setRequestStatus('pending');  
              try {
                await fetch('/api/mail', {
                    method: 'POST',
                    body: JSON.stringify({ enteredEmail, enteredName, enteredPhone, enteredCompanyname, enteredCompanywebsite, enteredMessage }) 
                });
                  setRequestStatus('success');
                  setEnteredEmail('');
                  setEnteredName('');
                  setEnteredPhone('');
                  setEnteredCompanyname('');
                  setEnteredCompanywebsite('');
                  setEnteredMessage('');
    
              } catch (e) {
                setRequestStatus('error');
              }
            //} 
          }
    
          let notification;
    
      if (requestStatus === 'pending') {
        notification = {
          status: 'pending',
          title: 'Sending message...',
          message: 'Your message is on its way!',
        };
      }
    
      if (requestStatus === 'success') {
        notification = {
          status: 'success',
          title: 'Thank you!',
          message: 'We will get back to you soon!',
        };
      }
    
      if (requestStatus === 'error') {
        notification = {
          status: 'error',
          title: 'Error!',
          message: requestError,
        };
      }
    
    return( 
        <div className={classes.formcard}>
            <div className={classes.formcontainer}>
            <form onSubmit={handleContactFormSubmit}>
                <div className={classes.contactheading}> 
                    <h3  data-aos="fade-up">Let&#39;s talk over coffee <i className="fa fa-coffee"></i></h3>
                </div>         
                <div className={classes.contactsubheading}> 
                    <h6  data-aos="fade-up">15-minute call to discuss about your project</h6>
                </div> 
                <div className={classes.row}>    
                    <div className={classes.col}>
                        <label htmlFor="name"></label>
                        <input className={classes.inputcls} 
                        type="text" 
                        placeholder="Name *" 
                        name="name" 
                        id="name"  
                         value={enteredName}
                        onChange={(e) =>
                            setEnteredName(e.target.value)}
                         required /> 
                    </div>
                </div>
                <div className={classes.row}>    
                    <div className={classes.col}>
                        <label htmlFor="email"></label>
                        <input className={classes.inputcls} 
                        type="email" 
                        placeholder="E-mail *" 
                        name="email" 
                        id="email" 
                        value={enteredEmail}
                        onChange={(e) =>
                            setEnteredEmail(e.target.value)}
                        required />
                    </div>
                </div>
                <div className={classes.row}>    
                    <div className={classes.col}>
                        <label htmlFor="phone"></label>
                        <input className={classes.inputcls} 
                        type="tel" 
                        placeholder="Contact Numbar" 
                        name="phone" 
                        id="phone" 
                        value={enteredPhone}
                        onChange={(e) =>
                            setEnteredPhone(e.target.value)}
                        />
                    </div>
                </div>
             
                <div className={classes.row}>    
                    <div className={classes.col}>
                        <label htmlFor="companyname"></label>
                        <input className={classes.inputcls} 
                        type="text" 
                        placeholder="Company Name" 
                        name="companyname" 
                        id="companyname"
                        value={enteredCompanyname}
                        onChange={(e) =>
                            setEnteredCompanyname(e.target.value)}
                        />
                    </div>
                </div>
                <div className={classes.row}>    
                    <div className={classes.col}>
                        <label htmlFor="companywebsite"></label>
                        <input className={classes.inputcls} 
                        type="text" 
                        placeholder="Company Website" 
                        name="companywebsite" 
                        id="companywebsite"
                        value={enteredCompanywebsite}
                        onChange={(e) =>
                            setEnteredCompanywebsite(e.target.value)}
                        />
                    </div>
                </div>
                <div className={classes.row}>    
                    <div className={classes.col}>
                        <label htmlFor="message"></label>
                        <textarea className={classes.inputcls} 
                        name="message" 
                        placeholder="I'd like to chat about" 
                        id="message" 
                        cols="30" 
                        rows="5"
                        value={enteredMessage}
                        onChange={(e) =>
                            setEnteredMessage(e.target.value)}
                        ></textarea>
                    </div>    
                </div>
                <div className={classes.row}>    
                    <button className={classes.submitcls} type="submit" value="Send Message" id="submit">Send Message</button>
                </div>
            </form>
            {notification && (
            <Notification
              status={notification.status}
              title={notification.title}
              message={notification.message}
            />
          )}
        </div>
        </div>
    );
    }
    export default Formsection;