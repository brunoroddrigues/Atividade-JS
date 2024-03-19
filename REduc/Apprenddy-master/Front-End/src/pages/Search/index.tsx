/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Card from '../../components/Card';
import Footer from '../../components/Footer';

import styles from './Search.module.sass';
import api from '../../services/api';

interface CategoriesProps {
  id_categoria: number;
  descritivo: string;
}

interface FerramentasProps {
  id_ferramenta: number;
  descritivo: string;
}

interface PostProperties {
  publicacao: {
    id_conteudo: number;
    titulo: string;
    imagem: string;
    ativo: boolean;
    data_publicacao: string;
    descricao: string;
    ferramenta_descritivo: string;
    icone: string;
  };
}

const Search: React.FC = () => {
  const params = useLocation();
  console.log(params);

  const [categories, setCategories] = useState<Array<CategoriesProps>>([]);
  const [ferramentas, setFerramentas] = useState<Array<FerramentasProps>>([]);
  const [posts, setPosts] = useState<PostProperties[]>([]);

  useEffect(() => {
    api.get('/categorias?limit=6').then(response => {
      setCategories(response.data);
    });

    api.get('/ferramentas?limit=6').then(response => {
      setFerramentas(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get(`/conteudos/${params.search}&onlyActive=true`)
      .then(response => setPosts(response.data));
  }, [params.search]);

  return (
    <>
      <Navbar logged admin />
      <main className={`${styles.gridHalf} ${styles.searchGrid}`}>
        <aside className={`${styles.section} ${styles.filters}`}>
          <div className={styles.filterGroup}>
            <h2 className={styles.title}>Categorias</h2>
            {categories.map((category, index) => (
              <>
                <Link
                  to={`/search/?categoria=${category.id_categoria}`}
                  className={styles.link}
                >
                  {category.descritivo}
                </Link>
                <div className={styles.divider} />
              </>
            ))}
          </div>

          <div className={styles.filterGroup}>
            <h2 className={styles.title}>Ferramentas</h2>
            {ferramentas.map(ferramenta => (
              <>
                <Link
                  to={`/search/?ferramenta=${ferramenta.id_ferramenta}`}
                  className={styles.link}
                >
                  {ferramenta.descritivo}
                </Link>
                <div className={styles.divider} />
              </>
            ))}
          </div>
        </aside>
        <section
          className={`${styles.section} ${styles.container} ${styles.content}`}
        >
          <h1 className={styles.pageTitle}>Resultados de busca</h1>
          <div className={`${styles.gridAuto}`}>
            {posts.map(post => (
              <Card
                key={post.publicacao.id_conteudo}
                postId={post.publicacao.id_conteudo}
                image={post.publicacao.imagem}
                title={post.publicacao.titulo}
                date={post.publicacao.data_publicacao}
                description={post.publicacao.descricao}
                ferramenta={{
                  descritivo: String(post.publicacao.ferramenta_descritivo),
                  icone: post.publicacao.icone,
                }}
                imageBg
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Search;
