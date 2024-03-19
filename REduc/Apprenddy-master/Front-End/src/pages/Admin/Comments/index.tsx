/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import api from '../../../services/api';

import Menu from '../Menu';

import Navbar from '../../../components/Navbar';
import Button from '../../../components/Button';
import Footer from '../../../components/Footer';

import styles from '../Admin.module.sass';

interface Comments {
  id_comentario: string;
  id_conteudo: number;
  conteudo: string;
  usuario_nome: string;
  data_publicacao: string;
}

const comments: React.FC = () => {
  const history = useHistory();

  const [commentsContent, setCommentsContent] = useState<Comments[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    api.get<Comments[]>('/comentarios/tudo').then(response => {
      setCommentsContent(response.data);
    });
    setRefresh(false);
  }, [refresh]);

  function handleResourceDelete(id: number): void {
    if (window.confirm('Confirmar exclusão?')) {
      api.delete(`/comentarios/${id}`);
      toast.success('✅ Comentário excluido com sucesso!');
      setRefresh(true);
      // window.location.href = 'http://localhost:3000/admin/comments';
    }
  }

  return (
    <>
      <Navbar logged admin />
      <main className={styles.gridHalf}>
        <Menu />
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h1 className={styles.title}>Comentários</h1>
            </div>
            <div className={styles.tableWrapper}>
              <table>
                <thead>
                  <tr className={styles.tableHead}>
                    <th>Id comentário</th>
                    <th>Id recurso</th>
                    <th>Conteudo</th>
                    <th>Autor</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {commentsContent.map(comment => (
                    <tr>
                      <td>{comment.id_comentario}</td>
                      <td>{comment.id_conteudo}</td>
                      <td>{comment.conteudo}</td>
                      <td>{comment.usuario_nome}</td>
                      <td>
                        <div className={styles.actions}>
                          <Button
                            icon={MdClose}
                            variant="error"
                            onClick={() =>
                              handleResourceDelete(
                                Number(comment.id_comentario),
                              )
                            }
                          >
                            Excluir
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default comments;
