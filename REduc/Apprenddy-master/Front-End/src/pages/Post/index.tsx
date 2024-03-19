/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import { Form } from '@unform/web';
import Interwave from 'interweave';
import { FormHandles } from '@unform/core';
import { MdToday, MdFavorite, MdSend, MdEdit, MdShare } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '../../services/api';
import { displayErrors } from '../../util/error';

import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import CardPanel from '../../components/CardPanel';
import Footer from '../../components/Footer';

import styles from './Post.module.sass';

import backgroundImage from '../../assets/defaultBackground.png';

interface Params {
  id: string;
}

interface ContentData {
  publicacao: {
    likes: number;
    id_conteudo: number;
    id_usuario: number;
    id_ferramenta: number;
    titulo: string;
    imagem: string;
    ativo: boolean;
    data_publicacao: string;
    descricao: string;
    conteudo: string;
    usuario_nome: string;
  };
  tag: Array<{
    id_tag: number;
    descritivo: string;
  }>;
}

interface User {
  nome: string;
  foto_perfil: string;
}

interface Comment {
  id_comentario: number;
  conteudo: string;
  data_publicacao: string;
  id_usuario: number;
  id_conteudo: number;
  usuario_nome: string;
  usuario_foto: string;
}

interface Login {
  id_usuario: number;
  foto_perfil: string;
  id_tipo: number;
}

interface Ferramenta {
  id_ferramenta: number;
  descritivo: string;
  icone: string;
  id_categoria: number;
}

interface IsLiked {
  resposta: boolean;
}

const Post: React.FC = () => {
  const params = useParams() as Params;

  const [infoLoading, setInfoLoading] = useState('Carregando...');
  const [autor, setAutor] = useState<User>();
  const [login, setLogin] = useState<Login>();
  const [post, setPost] = useState<ContentData>();
  const [ferramenta, setFerramenta] = useState<Ferramenta>();
  const [liked, setLiked] = useState<boolean>();

  const [comments, setComments] = useState<Comment[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const formRef: any = useRef<FormHandles>(null);

  const copyToClipboard = () => {
    const textField = document.createElement('textarea');
    textField.innerText = window.location.href;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    toast.info('🔗 Link copiado para área de transferência!');
  };

  useEffect(() => {
    (async () => {
      const response = await api.get<ContentData>(`/conteudos/${params.id}`);
      const getAutor = await api.get(
        `/users/${response.data.publicacao.id_usuario}/info`,
      );
      const getFerramenta = await api.get(
        `/ferramentas?id_ferramenta=${response.data.publicacao.id_ferramenta}`,
      );
      const getLikes = await api.get<IsLiked>(
        `/conteudos/likes/${response.data.publicacao.id_conteudo}`,
      );

      setPost(response.data);
      setAutor(getAutor.data.user);
      setFerramenta(getFerramenta.data);
      setLiked(getLikes.data.resposta);
    })();

    api.get('/users/home/info').then(response => {
      setLogin(response.data);
    });
  }, [params.id]);

  useEffect(() => {
    api
      .get(`/comentarios/${post?.publicacao.id_conteudo}?limit=100000`)
      .then(response => {
        setComments(response.data);
      });
    setRefresh(false);
  }, [post, refresh]);

  if (!post) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <h2>{infoLoading}</h2>
      </div>
    );
  }

  const handleCommentSubmit = (data: Record<string, unknown>) => {
    try {
      api.post(`/comentarios/${post.publicacao.id_conteudo}`, data);
      toast.success('✅ Comentário adicionado com sucesso!');
      formRef.current.reset();
      setTimeout(() => {
        setRefresh(true);
      }, 1000);
    } catch (err) {
      displayErrors(err, formRef);
      toast.error('❌ Erro ao adicionar o comentário!');
    }
  };

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      api.delete(`/conteudos/likes/${post.publicacao.id_conteudo}`);
    } else {
      setLiked(true);
      api.post(`/conteudos/likes/${post.publicacao.id_conteudo}`);
    }
  };

  return (
    <>
      <Navbar logged />
      <header>
        <Parallax
          className={styles.parallax}
          contentClassName={styles.container}
          bgImage={
            post.publicacao.imagem ? post.publicacao.imagem : backgroundImage
          }
          strength={200}
        >
          <h1 className={styles.title}>{post.publicacao.titulo}</h1>
        </Parallax>
      </header>
      <main className="container">
        <section className="section">
          <CardPanel
            className={styles.postCard}
            image={autor?.foto_perfil}
            imageAlt="name"
          >
            <div className={styles.authorInfos}>
              <Link to={`/user/${post.publicacao.id_usuario}`}>
                <h2 className={styles.name}>{post.publicacao.usuario_nome}</h2>
              </Link>
              <div className={styles.postInfos}>
                <span className={styles.date}>
                  <MdToday className={styles.icon} />
                  {post.publicacao.data_publicacao}
                </span>
                <span className="dot" />
                <span className={styles.likes}>
                  <MdFavorite className={styles.icon} />
                  {post.publicacao.likes}
                </span>
              </div>
            </div>
            <div className={styles.related}>
              <h3 className={styles.description}>Ferramenta</h3>
              <div className={styles.tool}>
                <div className={styles.iconeWrapper}>
                  <img src={ferramenta?.icone} alt="" className={styles.img} />
                </div>
                <h6 className={styles.toolName}>{ferramenta?.descritivo}</h6>
              </div>
            </div>
            {post.publicacao.id_usuario !== login?.id_usuario && (
              <Button
                icon={MdFavorite}
                iconClass={styles.icon}
                className={`${styles.button} ${liked ? styles.favorite : ''}`}
                onClick={() => handleLike()}
              />
            )}
            {post.publicacao.id_usuario === login?.id_usuario && (
              <>
                <Link to={`/edit/resource/${post.publicacao.id_conteudo}`}>
                  <Button
                    icon={MdEdit}
                    iconClass={styles.icon}
                    className={styles.button}
                  />
                </Link>
              </>
            )}
            <Button
              icon={MdShare}
              iconClass={styles.icon}
              className={styles.shareButton}
              onClick={() => copyToClipboard()}
            />
          </CardPanel>
        </section>
        <section className={`section ${styles.content}`}>
          <Interwave
            content={post.publicacao.conteudo}
            allowList={[
              'iframe',
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'table',
              'tr',
              'th',
              'td',
              'tbody',
              'img',
              'thead',
              'ul',
              'ol',
              'li',
              'a',
              'b',
              'strong',
              'center',
              'i',
              'div',
              'br',
            ]}
          />
        </section>
        <section className="section">
          {comments.map(comment => (
            <CardPanel
              className={styles.commentCard}
              image={comment.usuario_foto}
              imageAlt={comment.usuario_nome}
            >
              <div className={styles.content}>
                <div className={styles.infos}>
                  <Link to={`/user/${comment.id_usuario}`}>
                    <h3 className={styles.name}>{comment.usuario_nome}</h3>
                  </Link>
                  <span className="dot" />
                  <span className={styles.date}>{comment.data_publicacao}</span>
                </div>
                <p>{comment.conteudo}</p>
              </div>
            </CardPanel>
          ))}
          <CardPanel
            className={styles.commentCard}
            image={login?.foto_perfil}
            imageAlt="name"
          >
            <Form
              ref={formRef}
              onSubmit={handleCommentSubmit}
              className={styles.commentForm}
            >
              <Input
                name="conteudo"
                label="Comentário"
                placeholder="O que você achou deste recurso?"
                className={styles.input}
                button
                buttonType="submit"
                buttonIcon={MdSend}
                buttonClass={styles.inputButton}
                containerClass={styles.textareaContainer}
              />
            </Form>
          </CardPanel>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Post;
