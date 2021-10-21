import * as React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import './index.scss';
import * as config from '../../../config/SiteConfig.js';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      justifyContent: 'space-between',
      padding: theme.spacing(3, 2),
      zIndex: 3,
      position: 'relative',
      marginTop: '-60px'
    },
    fluid: {
        minHeight: '360px',
        height: 'auto',
        maxHeight: '60vh',
        width: '100%',
        position: 'relative'
    },
    avatarContainer: {
        marginTop: '-80px',
    },
    avatar: {
        margin: 10,
        width: '120px',
        height: '120px',
        backgroundColor: theme.palette.primary.main,
        '& img': {
            transform: 'scale(0.7)',
            marginBottom: 0
        }
    },
    title: {
        fontSize: theme.typography.h4.fontSize,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.primary.main,
    },
    subtitle: {
        fontSize: theme.typography.h6.fontSize,
        padding: theme.spacing(1),
        color: theme.typography.h5.color,
        textAlign: 'center',
    },
    form: {
        // fontSize: '96px',
        // letterSpacing: '-7px',
        // animation: 'glitch 1s linear infinite',
        color: theme.palette.primary.main,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '600px',
    },
    wrapper: {
        position: 'relative',
        width: 'fit-content',
    },
    buttonSuccess: {
        backgroundColor: theme.palette.primary.main,
    },
    buttonProgress: {
        color: theme.palette.primary.main,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
      },
  }),
);

async function saveForm(data) {
        const res = await fetch(config.contactSubmitAPI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        if (res.status !== 200) {
            throw new Error(res.statusText);
        }
        return res;
}

const Product = (props) => {
    const classes = useStyles(props);
    const {name, description, image, postPath, title} = props;
    const [loading, setLoading] = React.useState(false);
    const snackDefault:{open: boolean, severity: "error"|"success", message: string} = {open: false, severity: 'success', message: ''};
    const [snack, setSnack] = React.useState(snackDefault)
    React.useEffect(() => {
        loadCaptchaEnginge(6); 
    }, []);
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        message: '',
        captcha: '',
        formErrors: {name: '', email: '', message: ''},
        validName: false,
        validEmail: false,
        validMessage: false,
        validCaptcha: false,
        validForm: false
    });
    const onFormChange = (event) => {
        if(loading) return;
        

        const key = event.target.name;
        let value = event.target.value;

        if (key === 'message' && value.length > 1000) {
            value = formData.message;
        }

        const data = {...formData};
        data[key] = value;

        // setFormData({
        //     ...formData,
        //     [key]: value,
        // });


        // validations
        if (data.name.trim().length !== 0) {
            data.validName = true;
        } else {
            data.validName = false;
        }

        if(data.email.trim().length !== 0 && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
            data.validEmail = true;
        } else {
            data.validEmail = false;
        }

        if(data.message.trim().length !== 0) {
            data.validMessage = true;
        } else {
            data.validMessage = false;
        }

        if(data.captcha.trim().length !== 0) {
            data.validCaptcha = true;
        } else {
            data.validCaptcha = false;
        }

        data.validForm = data.validName && data.validEmail && data.validMessage && data.validCaptcha;

        setFormData(data);
    };

    const onFormSubmit = async (event) => {
        event.preventDefault();
        const data = {name: formData.name, email: formData.email, message: formData.message};
        
        if (!validateCaptcha(formData.captcha)) {
            setSnack({open: true, severity: 'error', message: 'Invalid Captcha'});
            return;
        }
        setLoading(true);
        try {
            const response = await saveForm(data);

            setSnack({open: true, severity: 'success', message: 'Successfully submitted form'});

            setFormData({
                name: '',
                email: '',
                message: '',
                captcha: '',
                formErrors: {name: '', email: '', message: ''},
                validName: false,
                validEmail: false,
                validMessage: false,
                validCaptcha: false,
                validForm: false
            });
            setLoading(false);
        } catch (err) {
            setSnack({open: true, severity: 'error', message: 'Unable to Submit form'});
            setLoading(false);
        }
    };

    const handleClose = (event, reason?) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnack({
            ...snack,
            open: false
        });
      };

    return (
        <Paper elevation={24} className={classes.root}>
            <Container maxWidth="md" className={classes.avatarContainer}>
                <Grid container justify="center" alignItems="center">
                    <Avatar alt={name} src={image} className={classes.avatar} />
                </Grid>
            </Container>
            <br/>
            <Container maxWidth="md">
                <Grid container justify="center" alignItems="center" direction="column">
                    <Typography variant='h1' color='primary' className={classes.title}>{title}</Typography>
                    {/* <Typography variant='h1' color='primary' className={classes.title}>404</Typography> */}
                    <br/>
                    {/* <Typography variant='h2' color='secondary' className={classes.subtitle}>Oops! The page you were looking for doesn't exist</Typography> */}
                </Grid>
                <Grid container justify="center" direction="column">
                    <form className={classes.form} autoComplete="off" onChange={(e) => onFormChange(e)} onSubmit={(e) => onFormSubmit(e)}>
                        <TextField size="medium" error={!formData.validName}
                         required={true} id="name" label="Name" type="text" name="name" value={formData.name}/>
                        
                        <br/>

                        <TextField size="medium" error={!formData.validEmail}
                         required={true} id="email" type="email" label="Email" name="email" value={formData.email}/>
                        
                        <br/>
                        
                        <TextField minRows="4" maxRows="6" helperText="1000 character max" multiline={true} variant="outlined"
                         error={!formData.validMessage} required={true} id="message" name="message"
                         value={formData.message} type="text" label="Message"/>

                        <br/>

                        <LoadCanvasTemplate />
                        <br/>

                        <TextField size="small" error={!formData.captcha}
                         required={true} id="captcha" label="captcha" type="text" name="captcha" value={formData.captcha}/>
                        

                        <br/>
                        
                        <div className={classes.wrapper}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={loading ? classes.buttonSuccess : ''}
                                disabled={loading || !formData.validForm}
                                type="submit"
                            >
                            Submit
                            </Button>
                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                    </form>
                </Grid>
            </Container>
            <Snackbar open={snack.open} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert  elevation={6} variant="filled" onClose={handleClose} severity={snack.severity}>
                    {snack.message}
                </MuiAlert >
            </Snackbar>
        </Paper>
    );
}

export default Product;