/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-multi-str */
/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { MdSave } from 'react-icons/md';
import { Editor } from '@tinymce/tinymce-react';

import { displayErrors } from '../../../util/error';
import { uploadFile } from '../../../util/upload';
import api from '../../../services/api';

import Menu from '../../Admin/Menu';

import Navbar from '../../../components/Navbar';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import InputFile from '../../../components/InputFile';
import CustomSelect from '../../../components/Select';
import Footer from '../../../components/Footer';

import styles from '../Edit.module.sass';

interface Params {
  id: string;
}

interface FerramentaResponse {
  id_ferramenta: number;
  descritivo: string;
}

interface selectOptions {
  value: number;
  label: string;
}

interface Content {
  ativo: number;
  titulo: string;
  imagem: string;
  id_ferramenta: number;
  descricao: string;
  conteudo: any;
  alterado?: boolean;
}

interface ContentResponse {
  publicacao: Content;
}

interface Login {
  id_usuario: number;
  id_tipo: number;
}

const resource: React.FC = () => {
  const params = useParams() as Params;
  const history = useHistory();

  const [editConteudo, setEditConteudo] = useState<Content>();
  const [ferramentas, setFerramentas] = useState<selectOptions[]>([]);
  const [login, setLogin] = useState<Login>();

  useEffect(() => {
    Promise.all([
      api.get<ContentResponse>(`/conteudos/${params.id}?onlyActive=false`),
      api.get<FerramentaResponse[]>('/ferramentas?limit=10000000'),
      api.get<Login>('/users/home/info'),
    ]).then(response => {
      const [contentResponse, toolResponse, loginResponse] = response;
      setEditConteudo(contentResponse.data.publicacao);
      setFerramentas(
        toolResponse.data.map(ferramenta => ({
          value: ferramenta.id_ferramenta,
          label: ferramenta.descritivo,
        })),
      );
      setLogin(loginResponse.data);
    });
  }, [params.id]);

  // eslint-disable-next-line no-console
  console.log('Conteúdo', editConteudo);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formRef: any = useRef<FormHandles>(null);

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      // eslint-disable-next-line no-console
      console.log('Formulário', data);

      if (data.imagem === undefined) {
        data.imagem = editConteudo?.imagem;
      } else {
        data.imagem = await uploadFile(data.imagem as File);
      }

      const schema = Yup.object().shape({
        titulo: Yup.string()
          .required('Este compo é obrigatório')
          .min(8, 'Este campo deve conter ao minimo 8 caracteres'),
        tags: Yup.number().moreThan(0, 'Este campo é obrigatório'),
        ferramenta: Yup.number().moreThan(0, 'Este campo é obrigatório'),
        descricao: Yup.string()
          .required('Este compo é obrigatório')
          .min(20, 'Este campo deve conter ao minimo 20 caracteres'),
        // imagem: Yup.object().required('A imagem é obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // data.tags = editConteudo?.tag.map(tag => tag.id_tag);

      if (editConteudo?.alterado === true) {
        if (editConteudo?.conteudo.level.fragments !== null) {
          editConteudo.conteudo.level.content = editConteudo.conteudo.level.fragments.join(
            ' ',
          );
        }
        data.conteudo = editConteudo?.conteudo.level.content;
      } else {
        data.conteudo = editConteudo?.conteudo;
      }

      if (login?.id_tipo !== 1) {
        data.ativo = Boolean(editConteudo?.ativo);
      } else {
        data.ativo = false;
      }

      await api.put(`/conteudos/${params.id}`, data);

      if (login?.id_tipo === 1) {
        toast.info('⏳ Recurso enviado para análise!');
      } else {
        toast.success('✅ Recurso editado com sucesso!');
      }

      formRef.current.reset();

      if (login?.id_tipo === 1) {
        history.push(`/user/${login?.id_usuario}`);
      } else {
        history.push('/admin/resources');
      }
    } catch (err) {
      displayErrors(err, formRef);
      toast.error('❌ Erro ao editar o Recurso!');
      console.log(err);
    }
  };

  return (
    <>
      <Navbar logged />
      <main
        className={`${
          login?.id_tipo !== 1 ? styles.gridHalf : styles.customGrid
        }`}
      >
        {login?.id_tipo !== 1 && <Menu />}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.resourcesTitle}>
                <h1 className={styles.title}>Editar recurso</h1>
              </div>
              <Button
                type="button"
                variant="contrast"
                icon={MdSave}
                onClick={() => formRef.current.submitForm()}
              >
                Salvar
              </Button>
            </div>
            <Form
              ref={formRef}
              onSubmit={handleSubmit}
              className={styles.form}
              initialData={editConteudo}
            >
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
                  { value: Number(0), label: 'Inativo' },
                ]}
                value={login?.id_tipo !== 1 ? Number(editConteudo?.ativo) : 0}
                onChange={e =>
                  setEditConteudo({
                    titulo: String(editConteudo?.titulo),
                    descricao: String(editConteudo?.descricao),
                    conteudo: String(editConteudo?.conteudo),
                    id_ferramenta: Number(editConteudo?.id_ferramenta),
                    imagem: String(editConteudo?.imagem),
                    ativo: Number(e.target.value),
                  })}
                className={styles.input}
                selectWrapperClass={styles.input}
                containerClass={styles.noMar}
                disabled={login?.id_tipo === 1}
              />
              <CustomSelect
                name="id_ferramenta"
                label="Ferramenta"
                initialDefaultValue
                options={ferramentas}
                value={Number(editConteudo?.id_ferramenta)}
                onChange={e =>
                  setEditConteudo({
                    titulo: String(editConteudo?.titulo),
                    descricao: String(editConteudo?.descricao),
                    conteudo: String(editConteudo?.conteudo),
                    id_ferramenta: Number(e.target.value),
                    imagem: String(editConteudo?.imagem),
                    ativo: Number(editConteudo?.ativo),
                  })
                }
                className={styles.input}
                selectWrapperClass={styles.input}
                containerClass={styles.noMar}
              />
              <InputFile
                name="imagem"
                label="Imagem"
                previewSrc={String(editConteudo?.imagem)}
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
                  value={editConteudo?.conteudo}
                  onChange={e =>
                    setEditConteudo({
                      titulo: String(editConteudo?.titulo),
                      descricao: String(editConteudo?.descricao),
                      conteudo: e,
                      id_ferramenta: Number(editConteudo?.id_ferramenta),
                      imagem: String(editConteudo?.imagem),
                      ativo: Number(editConteudo?.ativo),
                      alterado: true,
                    })}
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
