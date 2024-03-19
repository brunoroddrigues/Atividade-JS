/* eslint-disable camelcase */
import React, { useEffect, useState, useRef } from 'react';
import {
  MdSearch,
  MdAccountBox,
  MdPersonAdd,
  MdDashboard,
  MdAdd,
  MdPowerSettingsNew,
} from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Input from '../Input';
import Button from '../Button';

import { logout } from '../../auth/token';
import api from '../../services/api';

import styles from './Navbar.module.sass';

import logo from '../../assets/logo.svg';
import userDefaultImage from '../../assets/noUserImage.jpg';
import background from '../../assets/defaultBackground.png';

interface NavbarProps {
  logged?: boolean;
  admin?: boolean;
}

interface UserProperties {
  id_usuario: number;
  nome: string;
  foto_perfil: string;
  texto_perfil: string;
  capa_perfil: string;
  id_tipo: number;
}

const Navbar: React.FC<NavbarProps> = ({ logged }) => {
  const history = useHistory();

  const [sidenav, setSidenav] = useState(false);
  const [user, setUser] = useState<UserProperties>();

  const formRef: any = useRef<FormHandles>(null);

  const script = document.createElement('script');

  script.src = '//code.jivosite.com/widget/nMKc2glgOW';
  script.async = true;

  document.body.appendChild(script);

  useEffect(() => {
    api.get('/users/home/info').then(response => {
      setUser(response.data);
    });
  }, []);

  // if (!user) {
  //   return <p>Carregando.....</p>;
  // }

  const handleSidenav = () => {
    setSidenav(!sidenav);
  };

  function handleLogout() {
    logout();
    window.location.href = '/login';
  }

  const handleSubmit = (data: Record<string, unknown>) => {
    history.push(`/search/?titulo=${data.search}`);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={`container ${styles.navbarWrapper}`}>
          <Link to="/" className={styles.logoWrapper}>
            <img className={styles.logo} src={logo} alt="Logo Apprenddy" />
          </Link>
          <div className={`${styles.content} ${logged && styles.logged}`}>
            <Form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
              <Input
                name="search"
                containerClass={styles.input}
                type="text"
                placeholder="Pesquisar"
                button
                buttonIcon={MdSearch}
              />
            </Form>
            <div className={styles.buttonsWrapper}>
              {user?.id_tipo !== 1 && (
                <Link to="/admin/resources" className={styles.link}>
                  <Button
                    type="button"
                    variant="transparent"
                    icon={MdDashboard}
                    className={styles.button}
                  >
                    Painel adm
                  </Button>
                </Link>
              )}
              {logged && (
                <Link to="/content/resource" className={styles.link}>
                  <Button
                    type="button"
                    disabled={!logged}
                    variant="transparent"
                    icon={MdAdd}
                    className={styles.button}
                  >
                    Publicar Recurso
                  </Button>
                </Link>
              )}
            </div>
            {logged && (
              <button
                type="button"
                onClick={handleSidenav}
                className={styles.userButtonWrapper}
              >
                <div className={styles.userButton}>
                  <img
                    className={styles.img}
                    src={
                      user?.foto_perfil ? user?.foto_perfil : userDefaultImage
                    }
                    alt="User avatar"
                  />
                </div>
              </button>
            )}
          </div>
        </div>
      </nav>
      {logged && (
        <>
          <aside className={`${styles.sidenav} ${sidenav && styles.active}`}>
            <ul>
              <li className={styles.userInfos}>
                <div className={styles.userBackground}>
                  <img
                    src={user?.capa_perfil ? user.capa_perfil : background}
                    alt="background"
                    className={styles.img}
                  />
                </div>
                <div className={styles.content}>
                  <div className={styles.userImage}>
                    <img
                      src={
                        user?.foto_perfil ? user.foto_perfil : userDefaultImage
                      }
                      alt="{ name }"
                      className={styles.img}
                    />
                  </div>
                  <span className={styles.name}>{user?.nome}</span>
                </div>
              </li>
              <li className={styles.divider} />
              <li>
                <Link to={`/user/${user?.id_usuario}`} className={styles.link}>
                  <MdAccountBox className={styles.icon} />
                  Meu perfil
                </Link>
              </li>
              <li className={styles.divider} />
              <li>
                <Link to="/content/resource" className={styles.link}>
                  <MdAdd className={styles.icon} />
                  Criar conteúdo
                </Link>
              </li>
              <li className={styles.divider} />
              {user?.id_tipo === 3 && (
                <>
                  <li>
                    <Link to="/admin/resources" className={styles.link}>
                      <MdDashboard className={styles.icon} />
                      Painel Administrativo
                    </Link>
                  </li>
                  <li className={styles.divider} />
                </>
              )}
              <li>
                <div className={styles.link} onClick={handleLogout}>
                  <MdPowerSettingsNew className={styles.icon} />
                  Sair
                </div>
              </li>
              <li className={styles.divider} />
            </ul>
          </aside>
          <div
            className={`${styles.overlay} ${sidenav ? styles.active : ''}`}
            role="button"
            aria-label="Fechar sidenav"
            tabIndex={0}
            onClick={handleSidenav}
            onKeyUp={handleSidenav}
          />
        </>
      )}
    </>
  );
};

export default Navbar;
