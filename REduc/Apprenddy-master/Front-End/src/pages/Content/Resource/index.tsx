/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-multi-str */
/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useEffect, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { MdSend } from 'react-icons/md';
import { Editor } from '@tinymce/tinymce-react';
import { useHistory } from 'react-router-dom';

import { displayErrors } from '../../../util/error';
import api from '../../../services/api';

import Menu from '../Menu';

import Navbar from '../../../components/Navbar';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import InputFile from '../../../components/InputFile';
import CustomSelect from '../../../components/Select';
import Footer from '../../../components/Footer';

import styles from '../Content.module.sass';

interface FerramentaResponse {
  id_ferramenta: number;
  descritivo: string;
  icone: string;
  id_categoria: number;
}

interface selectOptions {
  value: number;
  label: string;
  selected?: boolean;
}

interface Login {
  id_usuario: number;
  id_tipo: number;
}

const resource: React.FC = () => {
  const history = useHistory();

  const [ferramentas, setFerramentas] = useState<selectOptions[]>([]);
  const [conteudo, setConteudo] = useState<any>();
  const [login, setLogin] = useState<Login>();

  const formRef: any = useRef<FormHandles>(null);

  useEffect(() => {
    api.get<FerramentaResponse[]>('/ferramentas?limit=10').then(response => {
      const formattedFerramentas = response.data.map(ferramenta => ({
        value: ferramenta.id_ferramenta,
        label: ferramenta.descritivo,
      }));
      setFerramentas(formattedFerramentas);
    });

    api.get<Login>('/users/home/info').then(response => {
      setLogin(response.data);
    });
  }, []);

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      console.log('conteudo', conteudo);
      formRef.current.setErrors({});

      console.log('Formulário', data);

      const schema = Yup.object().shape({
        titulo: Yup.string()
          .required('Este compo é obrigatório')
          .min(8, 'Este campo deve conter ao minimo 8 caracteres'),
        ferramenta: Yup.number().moreThan(0, 'Este campo é obrigatório'),
        descricao: Yup.string()
          .required('Este compo é obrigatório')
          .min(20, 'Este campo deve conter ao minimo 20 caracteres'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const formData = new FormData();
      formData.append('upload', data.imagem as File);

      const response = await api.post('/uploads', formData);

      data.ativo = Number(data.ativo);
      data.imagem = response.data.url;

      if (
        conteudo.level.fragment !== null &&
        conteudo.level.fragment !== undefined
      ) {
        conteudo.level.content = conteudo.level.fragments.join(' ');
      }

      data.conteudo = conteudo.level.content;

      await api.post('/conteudos', data);

      if (login?.id_tipo === 1) {
        toast.info('⏳ Recurso enviado para análise!');
      } else {
        toast.success('✅ Recurso cadastrado com sucesso!');
      }

      formRef.current.reset();
      history.push('/search?title=');
    } catch (err) {
      displayErrors(err, formRef);
      toast.error('❌ Erro ao cadastrar o Recurso!');
    }
  };

  return (
    <>
      <Navbar logged />
      <main className={styles.gridHalf}>
        <Menu />
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h1 className={styles.title}>Recurso</h1>
              <Button
                type="button"
                variant="contrast"
                icon={MdSend}
                onClick={() => formRef.current.submitForm()}
              >
                Publicar Recurso
              </Button>
            </div>
            <Form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
              <Input
                name="titulo"
                label="Titulo"
                placeholder="Ex: Como usar o Visual Studio Code"
                className={styles.input}
                containerClass={`${styles.noMar}`}
              />
              <Input
                name="descricao"
                label="Descrição"
                placeholder="Ex: Neste recurso vamos ver como user o Visual Studio Code"
                className={styles.input}
                containerClass={`${styles.noMar}`}
              />
              <CustomSelect
                name="ativo"
                label="Status"
                options={[
                  { value: Number(1), label: 'Ativo' },
                  { value: Number(0), label: 'Inativo', selected: true },
                ]}
                value={login?.id_tipo !== 1 ? 1 : 0}
                className={styles.input}
                selectWrapperClass={styles.input}
                containerClass={styles.noMar}
                disabled={login?.id_tipo === 1}
              />
              <CustomSelect
                name="id_ferramenta"
                label="Ferramenta"
                options={ferramentas}
                initialDefaultValue
                className={styles.input}
                selectWrapperClass={styles.input}
                containerClass={styles.noMar}
              />
              <InputFile
                name="imagem"
                label="Imagem"
                className={styles.input}
                containerClass={`${styles.fullLine} ${styles.noMar}`}
              />
              <div className={styles.editorContainer}>
                <label htmlFor="conteudo" className={styles.label}>
                  Conteúdo
                </label>
                <Editor
                  textareaName="conteudo"
                  initialValue="<h1>Titulo</h1><p>Seu conteúdo vai aqui!</p><h2>Sub-titulo</h2><p>Mais conteúdo aqui!</p>"
                  init={{
                    height: 500,
                    width: '100%',
                    menubar: false,
                    plugins: [
                      'advlist autolink lists link image',
                      'charmap print preview anchor help',
                      'searchreplace visualblocks code',
                      'insertdatetime media table paste wordcount',
                    ],
                    toolbar:
                      'preview charmap anchor | undo redo | formatselect | bold italic link | \
                    image media table wordcount | searchreplace visualblocks code | \
                    alignleft aligncenter alignright | \
                    bullist numlist outdent indent | help',
                  }}
                  onChange={content => setConteudo(content)}
                />
              </div>
            </Form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default resource;
