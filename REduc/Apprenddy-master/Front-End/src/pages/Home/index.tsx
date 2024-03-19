/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { Parallax } from 'react-parallax';
import { MdSearch, MdArrowDownward } from 'react-icons/md';
import { Form } from '@unform/web';
import { useHistory, Link } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Footer from '../../components/Footer';

import styles from './Home.module.sass';
import homeHeader from '../../assets/home.jpg';

import api from '../../services/api';

interface PostProperties {
  publicacao: {
    id_conteudo: number;
    titulo: string;
    imagem: string;
    ativo: boolean;
    data_publicacao: string;
    descricao: string;
    id_ferramenta: number;
    ferramenta_descritivo: string;
    icone: string;
  };
  tag: Array<{
    id_tag: number;
    descritivo: string;
  }>;
}

const Home: React.FC = () => {
  const history = useHistory();

  const [posts, setPosts] = useState<PostProperties[]>([]);
  const [postslikes, setPostslikes] = useState<PostProperties[]>([]);

  useEffect(() => {
    api.get('/conteudos?onlyActive=true&ultimos=1').then(response => {
      setPosts(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('/conteudos?onlyActive=true&likes=1').then(response => {
      setPostslikes(response.data);
    });
  }, []);

  // function handleGetFeatured() {
  //   const postFeatured: Array<PostProperties> = [];

  //   posts.forEach(post => {
  //     const isFeatured = post.tag.filter(featured => {
  //       return featured.descritivo.toLocaleLowerCase().includes('destaque');
  //     });

  //     if (isFeatured.length > 0) {
  //       postFeatured.push(post);
  //     }
  //   });

  //   return postFeatured;
  // }

  const handleSubmit = (data: Record<string, unknown>) => {
    history.push(`/search/?titulo=${data.homeSearch}`);
  };

  return (
    <>
      <Navbar logged />
      <header>
        <Parallax
          bgImage={homeHeader}
          strength={200}
          contentClassName={`${styles.container} ${styles.parallaxContent}`}
        >
          <aside className={styles.aside}>
            <h1 className={styles.titleMain}>Apprenddy</h1>
            <h2 className={styles.subTitleMain}>
              Repositório de recursos educaionais digitais.
              <br />
              Encontre o que procura e aprenda o que precisa na Apprenddy!
            </h2>
            <Form onSubmit={handleSubmit} className={styles.homeForm}>
              <Input
                name="homeSearch"
                containerClass={styles.inputContainer}
                type="text"
                placeholder="O que você procura?"
                button
                buttonClass={styles.inputButton}
                buttonIcon={MdSearch}
              />
            </Form>
          </aside>
          <div className={styles.bottomContent}>
            <p>Deslize para ver ferrementas, destaques e novos recursos!</p>
            <MdArrowDownward className={styles.icon} />
          </div>
        </Parallax>
      </header>
      <section className="section container">
        <h2 className={styles.title}>Destaques</h2>
        <div className={styles.gridAuto}>
          {postslikes.map(post => (
            <Card
              key={post.publicacao.id_conteudo}
              postId={post.publicacao.id_conteudo}
              image={post.publicacao.imagem}
              title={post.publicacao.titulo}
              date={post.publicacao.data_publicacao}
              description={post.publicacao.descricao}
              ferramenta={{
                icone: post.publicacao.icone,
                descritivo: post.publicacao.ferramenta_descritivo,
              }}
              imageBg
            />
          ))}
        </div>
      </section>
      <section className="section container">
        <h2 className={styles.title}>Ultimos posts</h2>
        <div className={styles.gridAuto}>
          {posts.map(post => (
            <Card
              key={post.publicacao.id_conteudo}
              postId={post.publicacao.id_conteudo}
              image={post.publicacao.imagem}
              title={post.publicacao.titulo}
              date={post.publicacao.data_publicacao}
              description={post.publicacao.descricao}
              ferramenta={{
                icone: post.publicacao.icone,
                descritivo: post.publicacao.ferramenta_descritivo,
              }}
            />
          ))}
        </div>
        <div className={styles.bottomContent}>
          <Link to="/search/?titulo=">
            <Button variant="transparent" size="large" icon={MdSearch}>
              Buscar todos os recursos
            </Button>
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
