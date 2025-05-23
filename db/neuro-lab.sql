PGDMP                         }         	   neuro-lab    15.10 (Postgres.app)    15.2 M    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    18242 	   neuro-lab    DATABASE     �   CREATE DATABASE "neuro-lab" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = icu LOCALE = 'en_US.UTF-8' ICU_LOCALE = 'en-US';
    DROP DATABASE "neuro-lab";
                postgres    false            �            1259    18436    chat_messages    TABLE     �  CREATE TABLE public.chat_messages (
    id integer NOT NULL,
    user_id integer NOT NULL,
    chat_id character varying(255) NOT NULL,
    model_id integer NOT NULL,
    sender character varying(10) NOT NULL,
    message_text text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    CONSTRAINT chat_messages_sender_check CHECK (((sender)::text = ANY ((ARRAY['user'::character varying, 'bot'::character varying])::text[])))
);
 !   DROP TABLE public.chat_messages;
       public         heap    postgres    false            �            1259    18435    chat_messages_id_seq    SEQUENCE     �   CREATE SEQUENCE public.chat_messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.chat_messages_id_seq;
       public          postgres    false    227            �           0    0    chat_messages_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.chat_messages_id_seq OWNED BY public.chat_messages.id;
          public          postgres    false    226            �            1259    18361    comments    TABLE     �   CREATE TABLE public.comments (
    id integer NOT NULL,
    model_id integer,
    user_id integer,
    content text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);
    DROP TABLE public.comments;
       public         heap    postgres    false            �            1259    18360    comments_id_seq    SEQUENCE     �   CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.comments_id_seq;
       public          postgres    false    221            �           0    0    comments_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;
          public          postgres    false    220            �            1259    18498    dataset_text_class    TABLE     �   CREATE TABLE public.dataset_text_class (
    ticket_id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    category text,
    priority text,
    assignee_id integer
);
 &   DROP TABLE public.dataset_text_class;
       public         heap    postgres    false            �            1259    18345    datasets    TABLE        CREATE TABLE public.datasets (
    id integer NOT NULL,
    model_id integer,
    name character varying(255) NOT NULL,
    description text,
    data_url text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);
    DROP TABLE public.datasets;
       public         heap    postgres    false            �            1259    18344    datasets_id_seq    SEQUENCE     �   CREATE SEQUENCE public.datasets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.datasets_id_seq;
       public          postgres    false    219            �           0    0    datasets_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.datasets_id_seq OWNED BY public.datasets.id;
          public          postgres    false    218            �            1259    18459    model_metrics    TABLE     \  CREATE TABLE public.model_metrics (
    id integer NOT NULL,
    model_id integer NOT NULL,
    user_id integer NOT NULL,
    request_time timestamp without time zone DEFAULT now(),
    response_time_ms integer NOT NULL,
    input_length integer NOT NULL,
    output_length integer NOT NULL,
    success boolean NOT NULL,
    error_message text
);
 !   DROP TABLE public.model_metrics;
       public         heap    postgres    false            �            1259    18458    model_metrics_id_seq    SEQUENCE     �   CREATE SEQUENCE public.model_metrics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.model_metrics_id_seq;
       public          postgres    false    229            �           0    0    model_metrics_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.model_metrics_id_seq OWNED BY public.model_metrics.id;
          public          postgres    false    228            �            1259    18334    models    TABLE     >  CREATE TABLE public.models (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    model_url text NOT NULL,
    dataset_url text NOT NULL,
    parameters jsonb,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);
    DROP TABLE public.models;
       public         heap    postgres    false            �            1259    18333    models_id_seq    SEQUENCE     �   CREATE SEQUENCE public.models_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.models_id_seq;
       public          postgres    false    217            �           0    0    models_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.models_id_seq OWNED BY public.models.id;
          public          postgres    false    216            �            1259    18382    notes    TABLE     %  CREATE TABLE public.notes (
    id integer NOT NULL,
    user_id integer,
    model_id integer NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);
    DROP TABLE public.notes;
       public         heap    postgres    false            �            1259    18381    notes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.notes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.notes_id_seq;
       public          postgres    false    223            �           0    0    notes_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.notes_id_seq OWNED BY public.notes.id;
          public          postgres    false    222            �            1259    18399    refresh_tokens    TABLE     �   CREATE TABLE public.refresh_tokens (
    id integer NOT NULL,
    user_id integer,
    token character varying(255) NOT NULL
);
 "   DROP TABLE public.refresh_tokens;
       public         heap    postgres    false            �            1259    18398    refresh_tokens_id_seq    SEQUENCE     �   CREATE SEQUENCE public.refresh_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.refresh_tokens_id_seq;
       public          postgres    false    225            �           0    0    refresh_tokens_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.refresh_tokens_id_seq OWNED BY public.refresh_tokens.id;
          public          postgres    false    224            �            1259    18320    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(20) DEFAULT 'user'::character varying,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['admin'::character varying, 'user'::character varying])::text[])))
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    18319    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    215            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    214            �           2604    18439    chat_messages id    DEFAULT     t   ALTER TABLE ONLY public.chat_messages ALTER COLUMN id SET DEFAULT nextval('public.chat_messages_id_seq'::regclass);
 ?   ALTER TABLE public.chat_messages ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    227    227            �           2604    18364    comments id    DEFAULT     j   ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);
 :   ALTER TABLE public.comments ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            �           2604    18348    datasets id    DEFAULT     j   ALTER TABLE ONLY public.datasets ALTER COLUMN id SET DEFAULT nextval('public.datasets_id_seq'::regclass);
 :   ALTER TABLE public.datasets ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            �           2604    18462    model_metrics id    DEFAULT     t   ALTER TABLE ONLY public.model_metrics ALTER COLUMN id SET DEFAULT nextval('public.model_metrics_id_seq'::regclass);
 ?   ALTER TABLE public.model_metrics ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    228    229            �           2604    18337 	   models id    DEFAULT     f   ALTER TABLE ONLY public.models ALTER COLUMN id SET DEFAULT nextval('public.models_id_seq'::regclass);
 8   ALTER TABLE public.models ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            �           2604    18385    notes id    DEFAULT     d   ALTER TABLE ONLY public.notes ALTER COLUMN id SET DEFAULT nextval('public.notes_id_seq'::regclass);
 7   ALTER TABLE public.notes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    223    223            �           2604    18402    refresh_tokens id    DEFAULT     v   ALTER TABLE ONLY public.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('public.refresh_tokens_id_seq'::regclass);
 @   ALTER TABLE public.refresh_tokens ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    224    225            �           2604    18323    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            �          0    18436    chat_messages 
   TABLE DATA           u   COPY public.chat_messages (id, user_id, chat_id, model_id, sender, message_text, created_at, updated_at) FROM stdin;
    public          postgres    false    227   �]       z          0    18361    comments 
   TABLE DATA           Z   COPY public.comments (id, model_id, user_id, content, created_at, updated_at) FROM stdin;
    public          postgres    false    221   u       �          0    18498    dataset_text_class 
   TABLE DATA           l   COPY public.dataset_text_class (ticket_id, title, description, category, priority, assignee_id) FROM stdin;
    public          postgres    false    230   2u       x          0    18345    datasets 
   TABLE DATA           e   COPY public.datasets (id, model_id, name, description, data_url, created_at, updated_at) FROM stdin;
    public          postgres    false    219   �       �          0    18459    model_metrics 
   TABLE DATA           �   COPY public.model_metrics (id, model_id, user_id, request_time, response_time_ms, input_length, output_length, success, error_message) FROM stdin;
    public          postgres    false    229   ۓ       v          0    18334    models 
   TABLE DATA           s   COPY public.models (id, name, description, model_url, dataset_url, parameters, created_at, updated_at) FROM stdin;
    public          postgres    false    217   �       |          0    18382    notes 
   TABLE DATA           ^   COPY public.notes (id, user_id, model_id, title, content, created_at, updated_at) FROM stdin;
    public          postgres    false    223   ؚ       ~          0    18399    refresh_tokens 
   TABLE DATA           <   COPY public.refresh_tokens (id, user_id, token) FROM stdin;
    public          postgres    false    225   9�       t          0    18320    users 
   TABLE DATA           P   COPY public.users (id, email, username, password, role, created_at) FROM stdin;
    public          postgres    false    215   �       �           0    0    chat_messages_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.chat_messages_id_seq', 114, true);
          public          postgres    false    226            �           0    0    comments_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.comments_id_seq', 1, false);
          public          postgres    false    220            �           0    0    datasets_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.datasets_id_seq', 4, true);
          public          postgres    false    218            �           0    0    model_metrics_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.model_metrics_id_seq', 36, true);
          public          postgres    false    228            �           0    0    models_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.models_id_seq', 10, true);
          public          postgres    false    216            �           0    0    notes_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.notes_id_seq', 2, true);
          public          postgres    false    222            �           0    0    refresh_tokens_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.refresh_tokens_id_seq', 61, true);
          public          postgres    false    224            �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 3, true);
          public          postgres    false    214            �           2606    18446     chat_messages chat_messages_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.chat_messages
    ADD CONSTRAINT chat_messages_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.chat_messages DROP CONSTRAINT chat_messages_pkey;
       public            postgres    false    227            �           2606    18370    comments comments_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_pkey;
       public            postgres    false    221            �           2606    18504 *   dataset_text_class dataset_text_class_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.dataset_text_class
    ADD CONSTRAINT dataset_text_class_pkey PRIMARY KEY (ticket_id);
 T   ALTER TABLE ONLY public.dataset_text_class DROP CONSTRAINT dataset_text_class_pkey;
       public            postgres    false    230            �           2606    18354    datasets datasets_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.datasets
    ADD CONSTRAINT datasets_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.datasets DROP CONSTRAINT datasets_pkey;
       public            postgres    false    219            �           2606    18467     model_metrics model_metrics_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.model_metrics
    ADD CONSTRAINT model_metrics_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.model_metrics DROP CONSTRAINT model_metrics_pkey;
       public            postgres    false    229            �           2606    18343    models models_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.models
    ADD CONSTRAINT models_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.models DROP CONSTRAINT models_pkey;
       public            postgres    false    217            �           2606    18391    notes notes_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.notes DROP CONSTRAINT notes_pkey;
       public            postgres    false    223            �           2606    18404 "   refresh_tokens refresh_tokens_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.refresh_tokens DROP CONSTRAINT refresh_tokens_pkey;
       public            postgres    false    225            �           2606    18406 '   refresh_tokens refresh_tokens_token_key 
   CONSTRAINT     c   ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_key UNIQUE (token);
 Q   ALTER TABLE ONLY public.refresh_tokens DROP CONSTRAINT refresh_tokens_token_key;
       public            postgres    false    225            �           2606    18332    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    215            �           2606    18330    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            �           1259    18457    idx_chat_messages_user_chat    INDEX     a   CREATE INDEX idx_chat_messages_user_chat ON public.chat_messages USING btree (user_id, chat_id);
 /   DROP INDEX public.idx_chat_messages_user_chat;
       public            postgres    false    227    227            �           1259    18478    idx_model_metrics_model    INDEX     U   CREATE INDEX idx_model_metrics_model ON public.model_metrics USING btree (model_id);
 +   DROP INDEX public.idx_model_metrics_model;
       public            postgres    false    229            �           1259    18479    idx_model_metrics_user    INDEX     S   CREATE INDEX idx_model_metrics_user ON public.model_metrics USING btree (user_id);
 *   DROP INDEX public.idx_model_metrics_user;
       public            postgres    false    229            �           2606    18452 )   chat_messages chat_messages_model_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.chat_messages
    ADD CONSTRAINT chat_messages_model_id_fkey FOREIGN KEY (model_id) REFERENCES public.models(id) ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.chat_messages DROP CONSTRAINT chat_messages_model_id_fkey;
       public          postgres    false    3528    217    227            �           2606    18447 (   chat_messages chat_messages_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.chat_messages
    ADD CONSTRAINT chat_messages_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.chat_messages DROP CONSTRAINT chat_messages_user_id_fkey;
       public          postgres    false    215    3526    227            �           2606    18371    comments comments_model_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_model_id_fkey FOREIGN KEY (model_id) REFERENCES public.models(id);
 I   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_model_id_fkey;
       public          postgres    false    221    3528    217            �           2606    18376    comments comments_user_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 H   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_user_id_fkey;
       public          postgres    false    221    215    3526            �           2606    18355    datasets datasets_model_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.datasets
    ADD CONSTRAINT datasets_model_id_fkey FOREIGN KEY (model_id) REFERENCES public.models(id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.datasets DROP CONSTRAINT datasets_model_id_fkey;
       public          postgres    false    3528    217    219            �           2606    18468 )   model_metrics model_metrics_model_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.model_metrics
    ADD CONSTRAINT model_metrics_model_id_fkey FOREIGN KEY (model_id) REFERENCES public.models(id) ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.model_metrics DROP CONSTRAINT model_metrics_model_id_fkey;
       public          postgres    false    229    3528    217            �           2606    18473 (   model_metrics model_metrics_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.model_metrics
    ADD CONSTRAINT model_metrics_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.model_metrics DROP CONSTRAINT model_metrics_user_id_fkey;
       public          postgres    false    3526    229    215            �           2606    18392    notes notes_user_id_fkey    FK CONSTRAINT     w   ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 B   ALTER TABLE ONLY public.notes DROP CONSTRAINT notes_user_id_fkey;
       public          postgres    false    215    3526    223            �           2606    18407 *   refresh_tokens refresh_tokens_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 T   ALTER TABLE ONLY public.refresh_tokens DROP CONSTRAINT refresh_tokens_user_id_fkey;
       public          postgres    false    3526    215    225            �      x��<ێ�FvϪ��	l-��K������Xv`���=M�l��i�>Y��^C^$��$� �ь<�F�������s�Ȯ&)J���ڞ��b�T��:u�5�E�_�FI�]3uӹ��_���񆆡����^��/�Ȳ,��1{Ѫ�6Z���c�= ������>4,����{@�W�,�Q��14M�m�4z@�����͡�k��V�b�!1�e�@4������v��4⣸\�l�ߟ�I8���4y\�Q��8��t������8I�,�y�f�a��б$�,�E9���}Pl���x4�˰��h�%q1��<N��xz�U�����Ѩ�q�O����P�;Cx8e�'p@ԱrC3L���3v�/[�0��*[�������8�ށ�1�R����%�zc�Ӭ��"�4����~�grI{������ۼ9���1�@3�ռީA�p`U6��r!��[�hMSs�O�D[3\�)����g����tsw���¯��]��{�:�ٍY�����n�QQ6Z$覮{��b�!�zO͡�8^,���@�����%���4Z^�Q^(b����b�<<A�`�4�(�G�Z�P�&��e�d�gB^�T��O5�W�ޱ|W3�M��@����F�14u��l/z@��
�Ե���,�t<��L$�V̞�����j���n��LS"$Y���h}�7w7���vX�����)L�����
�M}��0�2�Y_��t6�l;��"����3���a�b�h	�rM�n
�
b��Nꏛ�/;�;.x
��) fz;��%&�в��	�1�W�(˦��^��A�"k3�N����c��P1K٩Q/�r���TA�����'-)��6p8{��b�����|���xjmvW@��a��7{`&5��}�Y*�w����8�݅�1�i��ow1L��]�>�Y�sv��9��1�9o�%� ��`aHխ� 5�L�-�\�@o�S1�W*�j�}�!�����ڀw�,]ͲE�u���4�懋�-N��_��{SwA֌�bVA�
T
}��'������<�o��
b��P�h�lv��U2��%�����L�m�<�/�0��h����^�4<��"Q�'QX�j�i�y��]Ͷ�k*:�l���;��ߢ�[5z�������w*�٦�p�_���K0���r}������.D�!��2��i�nB��b���C8�P�d����I�lGu7���_oۛ�0�Z�&��1{@�vw��ծ"�:�&��w�A̮��q�v�suA��^��Qs1�`�<�'Ak�
�پJ3�fQQ��Q����Tc��فB7�u��r��\��G!�t�G�,+"�4�e�.��\DEu7����M�n@�$\�#���t\�B���qv,��\������sCMjm9�u��z~�9��(Ԭ������F�9�H옠�A=����c��H��4���)�*�9v+�p��p��y��7ՆCy!�2�ub�s��70Wkn�=�F��R�=�&qa�6
�-�~0"ދ�s�~���bΎ[�L�r�w� ��"+
����g�Ւ���Y���c��ɸ����'�(B~Mì�
�M^��%Zt��K��n��s������Y4��̌�8����c?*K����q��0�ʋy����F/��|���녆���s�iDĂ-f+�U���h1ʦ� ���x�����7�٤/� j��0zQ~��Fh�D�it�n�ĬS1�GL��4�rJWɽ�n��sr RU��0�	.s\��l���?}�{�d�� �$y��B������~���M��	���l�5����'I�B�<Ĺ�9-#I�i��jJY9 ��/t�y��4��V�b��+�j�3!k.{�X�T����Da!���=O#А\l9��oa�?|� ����:�ɕ�r�SJ�lg^�(��`"j�O����>�OQ�9�=!)n�0/aj�EI<�5���+�}�l�[Y��ΥQ��~��E8N��>��hcO�S��3�`u#���3��jN�|,��$"
��F.�<�ȕ�s
ܙ����H�e����"s�,�5�t+m;{&؋�� ������#3�C.�M�f�$�3�����Dlb���|-p]�nihĜ*)Fɐ\?�<�����)>C �ls"���S��c����	�_��� V������.84z������b�ǳ�g�T���	>��8�0 �7��_�`dxFM�`._Ө!N���l��<PW���b��1������rsgs���
��6֏��րm �oai��.7_n���¿�`�w`�4�#��*�r��b}
m0^|����,�Mh��<C���C��X�-�?��Ga����7�$eۚa��{���H��hF����b��Z���l�ݱ4G�̦��@�k\�I��[�}��J���/(w�x ���i�u��c���)�R��F�`9��;���hH@��=<Cӧ$R�.AP�D#LZ�> ~�o�l��6�%�w8��i�T 	��\}&�s�w�lV0�Z���t)/"]���g$H���d�D͢�$�5��u�������W��oᚻ�5p�
�z@̵T9�Wd�^���.�l�c��-�m>ں����.�m�xE���	�r,L����@�/��9&� H
�.����8c+0��{�C)�C������q}"��!:O,m.�EP��Nx V��鹃��溁���\[���4��f��N�b�sm���g�)҉mw��l�T�w�����I�z*��k����,��\W=~��(�ň��o�F��3�|5��uQ��w:��tg���lE%v��x��J��-�����!�G
�i	���=��C�(���^"�����`����l�/��$��^��#��Y8�{���F^�3�!��#�����(fa��(Fa)G"
r%B�$h�"T���sh�C��\߳l�bX�ڲ� o|F�u�(�ɍJ��]n���l1z��3�o6_�<F�\���R��䃿 z�	��5ӝ��at9�Ǳ���]�i�qW|M�9%�����O~}n`�#����.���E`6�sR�Gd�S_t��% uz*��/?lߐ��vB��� '�����ď�)t�	�!y>��!K�t����C��_��{fG��l���c�HL?�3;b��T\�p|��<�RԮt���MT$�-���ۺ2�s�$��SAl�ue6�_̆EN�kXA��� ��~ک�� mKs,�UN��A��9�w�ġ�X�igW���1�$oO2<�aj���:����o��'y9����5`b�k�[1�S���V��,;8Y$�!ء��B���Es
:�a.O�,Hc��%��)�t�C�B�!��LQV��-2�{Y�RfT�0�$������4Bm ?���T1��P��"�TfU��1͊y��ڎ��0�W�3rQL C15(�@}��$�(?D���ɀ�1��"\�^��~�(q�$*D�c�� �r8��ں��%~�|��
��5��Sx��g�_�\��,k)�,ݗ�!�,D����,�zDOܹz��l��e�Rt�)<�0�,�KCj��d�-���a�`T�M��[zb�B86�A]R(��_��X��xcQP�X��)d�S�@Dun�	t��$��x!L.W9J�#��դ :``�5��v��ؾ���� �$�L#h.�e}/v��x r����`Ǜ{��:��,F���c��!�AJ+j|��JV��՘-9᫼z���k��
˧R��<�Nz�r�"����Rh����	�a�j�QGiW.h�S����a�#��H8B��:����0ɬLS�rg�ʈl� ~�x�
sA��ShG�����K�U��*�r;�ݠ�<�͢�luD�Q���ȪL�6��X��g�V=E��&#U
���i���&�
�}�����������EN��l�H������^֌�Pl������Ѡ��}���= �/iZ��cj�c�� (  b�޺��l���7-�iFUC��qo{��oò[Ҭ���s��nn���ۖ�4�*���O������: �c�رy�曆��m��+����XBk`u߳{@�w^��10,�n�Q �w_�������&� �{j���(��4����۴z@��%B� �����
��Q(��`��?Ϟv���@)�A�"+��j�l��h��w<��= �
����*#_SI���->����$�,zͧ�h/|��R|��y�Ŋ�֯6�_N����𚃯wmUb��l���W~&8���7X���L&Lu�h�CPe����ֻ�?�X�1������*���:�W=�z^���y���l1���-�0�X`�� ���Q,�s�*��mh�d��1�u&JA����߰nz�k�7��o��x;��B"�ܥ|�	���ۜ��8n��O�M�F�d�N�
&)�'�tG�2 h�}Kw{@,pUbQhX��Hpb���d4���e�~��B��d�RF��a>�R:��Y�r�GO�}`LT�,k�T�Y"_� �I�(SH�D
��2C���VM����Ec�4���8�i8��xT�ͲC�	W��ȷb�\9R{�xU�K�c��β:l�ծ�O�+"�����H޳��-��.��k���e�H���Q6�`��g���<�^%���<F�7*���$��<�e� ��^1e��(xh_��o�|X�Nݦm��|��{c��HX�c@�T�I��I��x8�T�?�(�*/U�Vق�wòN�*��q<�Dy�v�W�����.�����?��J�����枚s���N�Pq|G9��� xE���ą�*7�� f���`yC��|��Ԑ���W��pB|�n�@� �`[��(OwTEׄ z��;C�{`�~�@*��(�O�ɥ�����Ѯc��{����� �Hq�,<�@�c�h	��:��"����%�,�~K���oϨߥ�4L���Z��{A��FS@0��C������fh��7o�3t�S��Kx�'�r�H�X~W�p�ֆ+ X��J�be'���{��SA���ki��)�� @�7�m�uq�NZV��<E*1�Fe��?]��s�`Q���+��؆Ft��u?+�T�|p�
ES:7�3e��`��.	V˄NGS���d(K���h54~�f��I���N5�aÚ�,������@Pn(\U��*�?ˊq%����8A���.Ӂ����,���i���j�<,�jqq�]n;-��#;�C<�X�v^�4@��{+������}���CByB%�$����^Ď�e�;���!]VĎ���i�,���5���a��쾼P]:�.�H���\�S��;/�]�Z.a��`����S򆆇�\�5[�5��v:t�a��z�o��!�Z�	44���os�A@����'a���.�\�f�M�X^��
P��LD�1���k�I)�,�!jt�؁[ %s0L�RP��l���Ô����_��~~���)���cf�D�Srb��D�ku�b��?Z��a�=�e��I���	��ҩ^0�*V�Q���a9����D�Q�����Q��(]$�V!r,�6��q��q]���=����lO~$�Z��FO��@��Gq1P`�K�Ԥ�g╆�{�.oîTD�c�$p���~��[R	y/t�� ��2�q��~��D|���%�p�%~n	�pI��[R�|In�a��DC�p�%a��Roq��re5X��]��d՗��Q�N2Fm�4=c��( v[c��/�g�      z      x������ � �      �      x�͝]��6vǟ�W�L��6�-�%/*Y�2��,�\y���8Uv�L��q%���2����w4$� �{� p�_,Y�/�$����;���N�NO�O7�w��?=8�:����?��=�9�8��rzu�x~q���������~8�=�y�����c���������������웇_=><����'��� ő�W9�G�[��/�yp��_��_�������p�����/��������������o��������|�տ~��7�����^�W������������7�?y����������ٗ�}~��Q���p��&�_���n�������Ho��9������������ѣ�Ϟ�x�ٓ��8HvT�������s/�w:^����K��?��|s�}c0\����������o���ϟ>�/��9����{�Ϋq���zp�����e�K��<L�_��?�q��d��_�՝���������N�o�p�%��=}\?�����G_���o��������ֿ�k���w���*��I��Mr���J���p��#5]�m?�{����o�;���x�����O>}�x���:����75����7ú������y���iIM�e~[�冧�,��5|���ǿ}���g���#cק��i.���l���4-������ۼ��GƳ�q�C��ߝ߿���ncx�~2��}�a��G���`�������gG&b��	�EFS��x~��'���<ǟ�ˍ������}?Q^�>>�����ݑ���̑��1.\��T�Gр�����?��������k��`J�w\����_~�5?�����o����j�/K�_�u�����.��b��+�C�"~��#�5/�7��p�_�Y�z��q_�7p�g�2��[�QF�7�9-;��^����í�K�7s�ôt]��w���&������^y��>8�����ˊ�,�w���fm~~8��kx��A_w:l�7�������F�sn���q5��榿�/�r?7���xG��ܰ�ܝ��rj
j3NN~���r��q>Fz��0��8»�K4�㭵&�"�k����\~�����I�x��w���y�l�	Uh����a*��8�k�6�F������F�Qh��?�Kyu;���u����ٜ#z���s����>�w��%�ƟnM̛��^^]���iw�za�tJ$�ٲe�p$6`�'��>
�<R6����T[����2��(�nI��r\�d�s4�@�o�ȸ��iP-���$\.�p�>��7��{O�缉U�nK�����TsU�D��]WtY�qu��һ�W+"�^�O+���Bm� WfZ���$�tK�1r��f�9|\�E�s]�-׹�F�]�E��?�k���W��K?���ZӇ���й~Fikt:v�y�~�5Ԗ�O~4��LIi���n[���䷁G����n � ��Mg�S}4$���<��,c�-R��X�b�A������%Vjm��Ǽ�z8�v
��5 p��xt9�,��a�n�tq�m:���$�8���i��v%�ĵ?+���5�7`GY�����４�gNՉ~@�;����e=��;�a4G�̉�Y���X:��u���mPb�k��.7��	XwrK�"g4º&��J�8��8���{Ȱۄ��U�Y��������+#���(��>Fö)�l.�z�o3&��wa���.���i�ఁz��@d0á�|4����K)	��xa����ȩW��L(��e�$+
��kYu0X�<�kS���P������/����UK&���W���`<׈i��{����M6������&W��k:���Tc����u��"_ݞ=b��j��D���Ϡ��f� f{'6Ade��y'��!�~+HE�9Z�{YW�XD��"U0&��G���&H+'�Lq^���v��	a���-��=mMH�rWA%6N�r	bD)BƢ)1������ �R�t~k��QP�����\����O�=��l�J�) �`� ���muY�.�c'b]r�t5��*�Lãe�;��pt�i�+��WF�VWt=��4Z��0�����.*T�eAȷ3rlu���%����k��9���4r��0Zf��65;�)�#9m��-3�>��UX[��w [�2�Գ�6��E� 9^�����H������nJs>�F|)�V���8\��afɻ�M�U������{��'�L ��W�5�q�#�+`	Զ���9��q0�Zւ��V6c���2I%��ԁ����}�Y���]��u�4 <O�!��m/xc��w����A�Z�:�40�.�p�+��.�Tnp��5�'�g�@�34h�3�F�y�e����;\,��YQb���eX<j���8p�����U����
T�5o��r���3[�;�,Pfsb
���d�8��(bL�S�)��8�&,'B�<ް\�0z��\����C���(T�F���H 
<�؂�Aq!�,ݲ��߲�\�v�.�ٛ�[ܪ��]�*��n����Į�hx�pl�*��M=�����sf�DN5��_7x�!����D����DK�r�H��:.1�1?IN��('��
g-���,~WD1O�bBgc�/[.��U8�&y6��gO���0p�bR�mz�99�덍Ɣ�����,���^�@{��^�b�hu$.j ��u^��5���rMs*oJ�rC��P��s�1��������r��D�"=��d�JC�t�ٯ'�n�l�%�|�S��(`���_?4��+��b����+c>���{ȶr���"�g}��(��|��%ܑ��B6F[k5"-a �b٬�:��8be18���[��<����f��Ǒ�+O����c��@�9\�T��Ze�yPt��-BbFt�๲%���DG�$$��$�K�#b�DCdW0��!� x!g�a`0SI�Ҹe��`��8�̼`���z�r*�s-Ot��$2��#9�&o��
��?{��ݡ|".u�t�F�N�]�Q�4����AĀ]���0U'8��ݔN�y�z��D3a\�+��E�Ӆ�HI�A��
�d4�|A��]2/B��d!�å�qGR�z�H ;��7#t�̯:�z�r]��˲�3�rh��|_�V!
PB����[�-$U����ޜ��b�^(p%�U��02)�� 	ǭ|�����~DJDռ��U�O�f(�Z���`�ZQ�B��&���=��{�1�6�A�'�tsio_�e�n�"4u'�и��,��Z,z����*ȱ�9��!�tKdPs�An�d�u��DwDqK#�A��� A�� ��ץ�4-���(~���3E�v~�f��3�ڤ�f6<o�䒵�[��oZEi�6��_�8Fd�?��˜�j1��~��q��6b�%$W�
r�v�.?�Z`�\��5���]�FN�L���R�����ے�w�m=��I�	��1!Ҷ�#B�d�n*U��V�"�\A��~fّ�m�*��>
�Ӯ!7 ��7H�����*��ڵ7NN�NIW�H4�}(#��<>�P�+�l�\�"�&�T�ٴ,bW�dyB�36����Z�#�$�̑Hr`�GF��1'�p-D�D�+j9[�\g��R�/J��E8����Z���[k3H�bV�e���B���N�z�����",�o��}��%�պ�׹*�x'FЪ��r[����³���F��zc#7��Z����:�`����Z�r�J��9��es�u�cQ飕�%�7-�6�+���e���+|���1��*2F��nf�٬
^F"{".�V�d4�é�TƝ�J=Y�zO'0���36!{[�����М��YRoS� H�	�A��I]X���ș��0J���&n��V��jru�W�� �rQ�P�v �P�n���׭̄��b�چ���V�b3�VbK��%i#����� <��ǭ�x,�����G����E�[/Al�~�^��Jd3�Wn z+Ay�hEVB�^:4�."����.7T�S:�Mrbs[o �Б��9�.Ӊ)�V�\��,��Fޕ�Uw�˲	 �  �QZУ�"T_��"���d\&�Ru��-�J��Uv���Z��jw�G�H�	� �NΦb)	�2�F���B�=F"�07�%\�jnPe+זu�)��C��G�<���۳O�����g�s�v����y^q��U6�[�uV��,�����MϹ������˺�q��Ѷ��]�9J�L-���Cs`�xV$�<�h�b��+r�6,�(���B%�f0?9���:�J����{r�v�H:�k�ݖ��M(N�Hx����۵$�K6�E%b$�G҈3�O������Ehq��qrF6�X�IA���R�v�����"fR���R����Rȑ��<uY�DiVr�v.�h�C~�N�?X�lh\�7_���a��c>�u��u�\�tʮr&�Ǉ P:�E��Q�L<[��ଊ��b��(s�VL>��R[.�Ԁ�� ��QT��V�9fX|7D= *���T1�[h��s�lY���U����s�@$��B�蛸%զ,@�bn��e��-��k�Q���)���ϳ��|"�����q��O
8<�ΥNQ�b�@�6O�ہCn�^ϸ�n��r�wFg��r!�JGK7�iu��-@�Ww�8�ه	��8&Uw�'��L烺�� �E��۾8��#�|t���3u��2�&�q�D3����!d8�s�f���r��0s͚֟uL��N7o�o4��?��-��fD��jr�vB�5O�s@*4��t*�`�dU���"�o���h�M��p�L��-��/ M�jr�6��t�|m�S�v*	S��r�}�FG�l7��>[��AɁ/A�Ů)Q$���
[�!.H ���9� �ȥ`��;�+(�2/X	��\����<�%~�Bf��.��f�%<����F}�en$�$�[}4��U������r��p��g�4 ��J���f!$O�J����鈼ljc@\tzl���I�;*��J���1ӌ�
SV9�"�j�������U~^g�kZ��Ζ��\>��4d��bj9Ur�u���GXW"�68\�|���s��J�yKiTbc.#GV�Ak�ц�}�0����fo�Vr�4ȅ�_ˈ�����w�]�~������񶤱���1ǁ��OQ4R��=f��Wcj�kC�T;��e�Ѯeo�<�Nl1�\�v����y~��]͆GA����ea����͡�4��3�0S�m�w)M�I3�8Ef]À�t�$��o:���7&B�ַ���T�ɷ7���z�ݵX�ņ��a��s�MJ�����!ۖ0m3,^��{Y3�R|��PL\��.�6�*�^�ۆ�[���mCN�F��]u�d�4���	��l�W��2��ș]�;�*����q�	s30��7�e�8�Pܐc�sȔ��VF�&q��:D�SS�ш�&2b{y-��*��:%�J�� 4"��V�2R�4�_��v\@����&_�c)M6?[?We�ӷ���Ȗ�:S���B� 	Q#b*o�]�DcT��Y��4Ԓ5�Z��T�ܤ�w�8*[ѯ�&�"�*Tm-6*g�vݳ�bk7x�d�^�Z��#��Qй�#ۭ��X�7����M#n��Mrh�۵��F�o&[������%"�Қr�� Sm�]�4j�1W>1ZL�顅�5_����XZ��ɅQpq��}!WεЈEC�Ю�M��*m]��<,� P�3blQ-����u�lHD�M@�X�JO�X:��"�:���!k�ڋ�ݟZ����W?[*�l�V�p����8���|;Q��G�V��0�y�D����n�m��ځ�Ep̙ؗ��Q6�l�޷3�E��Z�ްl��¯��j��0l�q7�]����َF�ْ��a�aY>G_��Z�/�f˶)T{�6-�Z�p�*��K����q�\M�퀨eI��ґ�9�s�m+yT����q�y�g𜣍�b<$��|��gSa��K�}����j��=P�9�HF�rd� i*�j�6�+�"Q��,���B�U��@�)+�������<H�7���bQ|CN��y��
�H���< q�����J��ߕ=�WZr?����:��.[��&ee�B3vl%����K�V�e[���\6��٦�V�s��r��vZ��Sc�j�u��E[���'�1�U(rq�iTn������P��F��+V�2B���_X��ou&��5Z��sint[�$��£�6���UWW����?�MQRGI��T�l��v�&%��M�v�Ja�t��:�ٴiu�e�4k�8<wޡL:L���إ)j-z��;V6s���ѹ���)����j��un��	k㲨��6���W}��4dF��亪wi�]1q�e����"�B�x�1��-�3�1J��k��i	uY-2T��#GJC�u����d����v7"��WV���i��-�j�lʩ�N�
���q�⭵1��2	��}~�O9�:�rí�,��c�*.[��.�s���jʲǮ H-��v�V�l^hlgюj���<��Sk ʵ��
�p	(���Z����U�K��Xs�z���Y�Ry�)p<u�f��x���';��5�Nu1&��ǉ�p"g\T0���N��lht%U�l�l��ߐ]�"�.*a�\ߦYV��jrZu�2�d�N�\G����믝��P�IR8mɴ�\��BR�����S���8�
�\�V@�SiQ2��8�Je���l �u���N�ի"��:�6�8�v�SH� �f�+�Zh���9�͑&sTtf�gp�t&�V�C���H�9��yוy�4�.^89�q��a\m5嬁;sV[|S8�t�m���M�xVf�LY����J���I���k�B�d�$I`e��4�X��,"��=rx6���L��muiaU�����&R4m5�`�����j}��ު����<Kv��#�dW���f�MLQ��q�ks���t�o�t���s-��W�iGE�Z��J_w�@.˛�G�5�c������ș�      x   �  x��S�n�@]���e+���M���Tu�E�����jGUw	i�V��*e�U��C0qx�����k�E�Ff��=�\S359����D��5o޽�4���Pgr�N�Z�P?�
�r���w�*9�"�WpX��T.e�����8j��P�TxQ�D~0h����+�D��y��9����,(�'�w-W�J���F��;Y���ˉx��`������i����?�5)�����%�S*�(���	~_#G¸��!�qY�c�.P \z�π�k�(�n��;�v�A����譠;ϯ��~�x�G_��adi�a9î���L�Vs͆^?l�sgr�i��ᚆn�����&��69>����f`�/Q�z���π8��-�"V����g�uN��T}�1/�������{�P�s��4��<E"����4@�pf�c�,���B� E&(��Va+tA9S�D�)�3a�Hyd#.���bT�p����"��;%I�) �	d@<0�<��_��2��˄�\����bb&F�*�}] �5��A�{���l�>��%\f��m�y`(�T�X��V�1Ğ��قr�j�e��r��=�{�s�+SDy�����8(��I69�q�	�	~$�^�%�S=���8gdd�y$ߋ'�.+v�(hyG� �ܚaնya'
�t*�-L�uj�}�۵�cX�&ǵ�z��a����T*��KO      �   �  x���=s1�k�W\h�_Z�Zz
j�L|�$v��?�W�s&NT�ħq#=��xwE��qb���x Ű"�T+6�4h`Ja߿n��Zc�&恒ח��P4S	E��U@{��ɢT+L���m,hP���B��H
��2�ϘF�,�8ᖚ�Ȃx�1I̙<�!F�bͳ)}�r��Y�)��S@���9uW��FI1%v&.5HC/MA^3HX��"R[I(Xh-��%4��Xd�,��ïA(��d��^�%W��9z��J,	�Y+]]�+��W���(ٜjp0?{dW�Z�k�D�^�$�M+�Q��2���&����BZ|=������Z ���SK�\�����0jI��IH� ����f�?���t����Ӽ����n8����n?m��mw��1|���?�>m���ZbrG:�i��q]3��Z͠?�Z)�z��?o�(�;U�&�Bp���yL���(�C�w��47�)��p�?�Ӵ�����|�Z��K���ѐ���c�i�����]N����Gd,�Ñ! D'���^2:��;�"Qk`�ʻJ���(b�*z�����4���fwk�w���8�̧�p{�N����ҳ'>J��8W�O{�k���"{u�I��t�"z���4#z�c]1�$��R~�u�Z�Q�R��Gi����] �T�(h����C]���Ta����R5�VEp[�[�zn]�/U���<����(�<{�HB,f(;���� Y���E��-qv(����3�O����l��l��      v   �  x�}U�jW�^=ŹL �w����U�-�!�\�Z�H��]�]�-�`�qCqJ��о@A���-Y�+��
}�~3ki�iW�sf��|�7�u��g/_�M�}�r5W+5Ut�o�XZ����Z}�'Ş�Ć~�.��Z`c�����RO�1b�Բ�UWO�au����u�s�;�z���;��u���~�DAV�L��@`Jn	���F�]`i��N��#��|�B]
�s&�}ƹ��X�.s��GϿ}��2�Qfih��~�F7ˆ�o��`���(붒vh����2�d�A��Z�h8N��1�#k���+\���|GZu����ت4��^�2���pe��;�ߣ?���p+���#���3�oSlNt���-X;`L��)q6�f���k��΄����q
�N�,�g���2�
:@<��������d�����L!��`�x|Nvj��P	�������}9�E�5���X_�����n(u�\�9��IJ���e���h��qU�}ƮË́Ԋ�����}Y¥e�8؝af�ab���VJ�q�ŝ�A�td�g��%W
��ku�&-)^�{`��:����ݖ�o�0�r@�rc�Z��0'Kx|��1ԟ;R+	opA���	�F\���#�O�Ih�~jgQ�f�V?H��u��$�dt N?i�n�f~�q�𹃅G��6|ϱ�ZM:��*����r�x��'�����vT���wǌ(�J�����D�"c�N��� 3����c�~;��=��,�3�d�U߫ZN�&e큭�KBHC��cD�k�����rv(n�c��Q�`2��_�20<��(��f�N1#D�ea�EI�i�)!�s'�&(觗�~%l[���0H3��N��G�8��_Y�4E�!�Q�Fm�ܛ���O7�B�a
|(N.�MX[s�o�aܔ���k-f��e�`m��������C�t:�;�>����{��c�_������>:�jT1�K�ڴ�;{�Ww����J��2�      |   Q   x�3�4�Ĕb06202�50�54P02�21�26�3�4543�#�e1�8�S��ZK=sKs3L)#=csKSS�=... 8��      ~   �  x���[��Z���7��
w����ML'��MPD֯;9[뜓�nH%e�2�c�9��?�?�Q��MT腪�P!@�tJsd���*���U���팾��}�\w6ч�\���}�2���@� π���k��l�B/%
��Y�#�3�h�9��yt�a-U���%r��4O!�:v�
'��s�r"����D��9��T�h*��9���_���e'�?>a��l�U��$���P4߄�\�~�@n/���T&�*��[9*PM�&xr��=�'��32��/��t��K����C��ɻ���e�b	H�@'U��WO+���X�!�E��Y�O&!ת|=o����ڦ6���;�v�l�?=����0vB��"�	mB�Ψ��������ќ1����T�&��k��"��3E��H��3� f�0"tp?�/���)F�=4`^ܴ�2v�O3�l�ӥ�6,l5!�[�E
���B<�#S��޺C?�݉����B�uNU�[.a��0n ��y�P��蔯A��+;��	o���˱���m{��A���.�#�����Lb�/�k����iÁ{���V��qEÄ�]oyV,D�*a1� �TQC���ժԽ�8�ͣ1��❩�q���w���<m'ޯKTřbeB�>M����ȴOŝ��0�Lӯ�N����h��4�r?j�m׭0b�\A����|�聅�ω�R���8�A�p���۹d �GF\�n���s@�
F�,��)�	��,$���$���f��j/�v�S5��BeV������t��A�����@lx>)B�y'�ߝ���#�N�zz�fE���P�����M���x��f�.��p��R^���9E<ؾ��8O�@���]Do�,��ʎ�=}��C��l�\z��,2�^��mr���i��gUÈy�f���-�bE�m�T0��ю:ݩ��������p}��B<.U�y�V(������Цl��kn��\����o��}XmK[���79I��q�S�b�<�+���/�֭�۰��!n?)E���S���Sؔ�<|��L$qRne��s����t?Q�T� ���	�d,���&��F�j6�X�]�/�}K���D9G� De�-��i��PZ�ڑ�-����T�ۣk@c����79u��e��(:f��2!B�|:7B�z�D΍_��]�V4����;z;ޭ��#����d�K�H���#\��#��F�62����U˯�����c⮥�}��F�CÍ��n5#�b�A�}���px4��~��
Zni`�$�oӦ�<U��
�����ya�ԏ��m#�[��(ﳋ@�	J�E�������g<����j����US�G6��b`�邼��u��DFmJ��dZ]:���h�{y �(g���㫗ʾ�-�K��FΑ.Q��5����߃˹��L�W�j��[W͊T8<��/���i	}��]�a���'�e0� B ^��|�#�V�~I�>1�ަ��fC����M&�2,�\�H4�NY�9B{$�h�����Yq��۸�����x�JKA�u�^;8E�q��1j�t�PPF�"B�(�'_��1��(��u��'JWb�7U���jt_�k+���x�b���F�-������|�e���h��x�_]O\��n��VC]�M	/����ƨ9�eBD�R1߈R:����V�O�⢊����|t"��km�顲��m�Qs��X��"�l�mQGǫq��}�C���=��
Ԭ
�K2�'��0j�tA�������м ���vbmr:T���������1��NZx����Q�A�;�H.ot�?����o����㒮�𜠣M�C�*�i������Im;�~mojOc��2!"�
~#NM�n�6��V��J�W6q�R��Z���q�Q8P$�{�Ǩ9�eB�Ѱ7|#N2B��m�Rv;W9��S��4�|���=c����Z/���2��LM�b���	�)�\0�J�mia$��q�x�Z�=-�.$��Ш��L��e�\ݽ���.=�!��*Uok�[)��<Ebc�;���!����h|6Dh��h��!�B�����-��הX���lʌ">}P��<��8S�T�ό�G��nJu'	�i{��GJ��(+Ǳߔi��G��ar���\U�Z���['y�ƺ}�no+��O��3粕H�u�T+�J=S�L��/���� ��Ay�x�l�Ն<��޶�͎u ���]��#�0������o��M7���n�ʨ���'��ص�
�Ze�q���0��%��/n�'j5���N�0z���]D]���E$�s�0��6`�m�fHn��1�a(���P/nqO����
��	T4�|!�1`R�!��E�=F�7$�I�"Ǫ!`m��H��y�kF� A�.V����]�m���/B#�ych=�$y���/�T�=�}���ZD��'\ވ���?߻�}��eP#��I��DqŲؾ^ёܜ�96��F��p�]-�X��ZhͲ�iGN�˺o7�Ixm� U�E��ޔw�zH��R�ܡ�1�Aψ�����",mJ�m���遱2#ސ+}̽��Q���+f���v9>��1sD˟AlIbAG?�9��ţy&��-���������л���âw��>��0f���_�Q�"�h��T��ZGt\���>6��j�ҋ�,��O�1S����(hH��z���Q_�-�s ��i;�<��Ԁ�1�8$C����ڢ�n e���1s�-�?�Z���E�=�s`�@(�#�Z�go�P/Gf�Y��Q)��߉0�OA��i��#Z(�T~��Lb��>�T�����s���G<n=9%<�q�X��!�o��
c或	�����ӆ�Dt���9��^)�TY\l2q��ƌ]��\�P�M�p�4H����82���U�P\GW��+�+�����S�������A�{�<&�r��b��J�a�K�?��,g*"񶜋ƛ�)kɔ��&.�"8<
<W7Hqq�C�@�/�
cfH�w��O=OE��I�*x��[���|V�P7q0�e5c�{�3������%����$D��C�����n�H��]��xW�\��8^u�?�������$K�L��3���߄�j?�B�}�|���&�I%�_܍��	����U���ðY ��      t     x�M�Ms�0���+<x5�&$�p�2V�)�H�3�(�����__;�f��{�gk�u�ٿ���%e��.Yu1t�<:���@��M,˕ur�-�Ua�t���a��.>��.R�yT ����C�ML�"L��ȺiA���ݽ�*T�2��A�a�y�*K��DYix6�*�xq6�r��Ȑڱ���.���6^ll!�9�X'Z��벖�M��ȭ�9`�w�x4��ozE�,ɪ�,��2rRʚ�N�j�R�%��j�f6�M"�pN�o���/8tk?     