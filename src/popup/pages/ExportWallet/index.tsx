import React, { Component } from 'react';
import { Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  withStyles,
  WithStyles, } from '@material-ui/core';
import { inject, observer } from 'mobx-react';

import styles from './styles';
import NavBar from '../../components/NavBar';
import AppStore, { store } from '../../stores/AppStore';
import cx from 'classnames';
import PasswordInput from '../../components/PasswordInput';
const strings = require('../../localization/locales/en_US.json');

interface IProps {
  classes: Record<string, string>;
  store: AppStore;
}

@inject('store')
class ExportWallet extends Component<WithStyles & IProps, {}> {
  public componentDidMount() {
    this.props.store.savePrivateKeyStore.init();
  }

  public componentWillUnmount() {
    this.props.store.savePrivateKeyStore.deinit();
  }

  public render() {
    const { classes, store: { savePrivateKeyStore } } = this.props;
    const disabled = savePrivateKeyStore.password.length === 0 ? true : false;

    return (
      <div className={classes.root}>
        <NavBar hasBackButton title={'Export Private Key'} />
        <div className={classes.loginContainer}>
          {store.savePrivateKeyStore.privateKey === '' && (
            <PasswordInput
              classNames={classes.passwordField}
              autoFocus={true}
              placeholder="Password"
              onChange={(e: any) => savePrivateKeyStore.password = e.target.value}
              onEnterPress={savePrivateKeyStore.confirmLogin}
            />)}
          {store.savePrivateKeyStore.privateKey === '' && (
            <Button
            className={classes.loginButton}
            fullWidth
            variant="contained"
            color="primary"
            disabled={disabled}
            onClick={savePrivateKeyStore.confirmLogin}
          >
            Login
          </Button>)
          }
        </div>
        <div className={classes.contentContainer}>
          {store.savePrivateKeyStore.privateKey !== '' && (
            <div className={classes.topContainer}>
              <Typography className={classes.exportWalletHeader}>{strings['savePrivateKey.walletCreated']}</Typography>
              <Typography className={classes.privateKeyText}>{savePrivateKeyStore.privateKey}</Typography>
              <Typography className={classes.warningText}>{strings['savePrivateKey.warningText']}</Typography>
            </div>
          )}
          {store.savePrivateKeyStore.privateKey !== '' && (
            <Button
            className={cx(classes.actionButton, 'marginBottom')}
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              savePrivateKeyStore.reset();
              this.props.store!.routerStore.push('/home');
            }}>
            I Copied It Somewhere Safe
          </Button>
          )}
          {store.savePrivateKeyStore.privateKey !== '' && (
            <Button
            className={classes.actionButton}
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              savePrivateKeyStore.savePrivateKey();
              savePrivateKeyStore.reset();
              this.props.store!.routerStore.push('/home');
            }}>
            Save To File
          </Button>
          )}
          <ErrorDialog {...this.props} />
        </div>
      </div>
    );
  }
}

const ErrorDialog: React.SFC<any> = observer(({ store: { savePrivateKeyStore }}: any) => (
  <Dialog
    disableBackdropClick
    open={!!savePrivateKeyStore.invalidPassword}
    onClose={() => savePrivateKeyStore.invalidPassword = undefined}
  >
    <DialogTitle>Invalid Password</DialogTitle>
    <DialogContent>
      <DialogContentText>You have entered an invalid password. Please try again.</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => savePrivateKeyStore.invalidPassword = undefined} color="primary">Close</Button>
    </DialogActions>
  </Dialog>
));

export default withStyles(styles)(ExportWallet);