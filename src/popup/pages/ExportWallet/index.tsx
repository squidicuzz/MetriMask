import React, { Component } from 'react';
import { Typography, Button, withStyles, WithStyles } from '@material-ui/core';
import { inject } from 'mobx-react';

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

    return (
      <div className={classes.root}>
        <NavBar hasBackButton title={''} />
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
        {store.savePrivateKeyStore.privateKey === '' && (
          <PasswordInput />
        )
        }
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ExportWallet);