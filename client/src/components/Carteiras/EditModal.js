import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  container:{
    width: "730px",
    height: "320px",
    left: "0px",
    top: "0px",
    background: "#343A40",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    width: '700px',
    height: '277px',
    left: '16px',
    top: '20px',
    background: '#37404A',
    boxShadow: '0px 2px 1px rgba(0,0,0,0.25)'
  },
  titleContainer: {
    width: '100%',
    height: '36px',
    background: '#3c4858',
    boxShadow: '0px 4px 4px rgba(0,0,0,0.25)',
    display: 'flex',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Nunito',
    fontStyle: 'normal',
    fontSize: '14px',
    lineHeight: '19px',
    paddingLeft: '12px',
    // display: 'flex',
    // alignItems: 'center',
    color: 'white'//'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #AAB8C5'
  },
  btBack:{
    background: '#0F7979',
    borderRadius: '8px',
    color: 'white',
    top: '20px',
    left: '20px'
  }, 
  btSave:{
    background: '#727CF5',
    borderRadius: '8px',
    color: 'white',
    top: '20px',
    left: '30%',
  },
  btExclude:{
    background: '#FA5C7C',
    borderRadius: '8px',
    color: 'white',
    top: '20px',
    left: '33%',
  },
  btContainer: {
    top: '20px'
  },
  dataContainer: {
    background: '#394451',
    border: '1px',
    boxSizing: 'border-box',
    boxShadow: 'inset 0px 0px 2px rgba(0, 0, 0, 0.25)',
    width: 'auto',
    marginLeft: '20px',
    marginRight: '20px',
    height: '40%',
    marginTop: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataSubContainer:{
    width: '80%',
    height: '50%'
  },
  form:{

  },
  descForm:{
    width: '100%',
    height: 'auto',
    textAlign: 'center'
  },
  descInput:{
    width: '100%',
    height: 'auto',
    background: '#37404A',
    borderRadius: '4px'
  },
  descriptionText: {
    fontFamily: 'Nunito',
    fontSize: '14px',
    fontStyle: 'normal',
    marginTop: '0px',
    display: 'flex',
    flexDirection: 'row',
    color: '#8492A6'
  }
}));

export default function EditModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [desc, setDesc] = React.useState('')

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (event) => {
    alert()
  }

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        react-transition-group
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {/* <div className={classes.paper}> */}
            <div className={classes.container}>
              <div className={classes.subContainer}>
                <div className={classes.titleContainer}>
                  <p className={classes.titleText}>Carteira de Ações</p>
                </div>
                <div className={classes.btContainer}>
                  <Button className={classes.btBack}>Voltar</Button>
                  <Button className={classes.btSave}>Salvar</Button>
                  <Button className={classes.btExclude}>Excluir</Button>
                </div>
                <div className={classes.dataContainer}>
                  <div className={classes.dataSubContainer}>
                    {/* <p className={classes.descriptionText}>Descrição</p> */}
                    <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
                      <FormGroup className={classes.descForm} controlId="desc">
                      <FormLabel className={classes.descriptionText}>Descrição</FormLabel>
                      <FormControl
                        className={classes.descInput}
                        autoFocus
                        // type="email"
                        placeholder="Digite o nome da carteira"
                        value={desc}
                        onChange={(event) => setDesc(event.target.value)}
                      />
                    </FormGroup>
                  </form>
                  </div>
                </div>
              </div>
            </div>
          {/* </div> */}
        </Fade>
      </Modal>
    </div>
  );
}