/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo-white.svg';
import api from '../../services/api';
import styles from './Footer.module.sass';

interface CategoriesProps {
  id_categoria: number;
  descritivo: string;
}

const Footer: React.FC = () => {
  const [categories, setCategories] = useState<CategoriesProps[]>([]);

  useEffect(() => {
    api.get('/categorias?limit=15').then(response => {
      setCategories(response.data);
    });
  }, []);

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.gridFooter}>
          <div className={styles.info}>
            <img className={styles.logo} src={logo} alt="Logo Apprenddy" />
            <p>
              Repositório de recursos educaionais digitais.
              <br />
              Encontre o que procura e aprenda o que precisa na Apprenddy!
              {/* A Apprenddy é uma plataforma de estudos gerais, entre e descubra
              sobre tudo aquilo que conheçe e que não conheçe! */}
            </p>
          </div>
          <div className={styles.content}>
            <h3 className={`h3 ${styles.title}`}>Categorias</h3>
            <div className={styles.linksWrapper}>
              {categories.map(category => (
                <Link
                  key={category.id_categoria}
                  className={styles.link}
                  to={{
                    pathname: '/search',
                    search: `categoria=${category.id_categoria}`,
                  }}
                >
                  {category.descritivo}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <div className="container">
          <p>&copy; Apprenddy. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
