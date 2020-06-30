# travis Ci自动化部署示例

[![Build Status](https://travis-ci.com/TinsFox/automatic.svg?branch=master)](https://travis-ci.com/TinsFox/automatic)

Vue + travis Ci自动化部署示例 ，没有实质的vue内容

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

##  [Travis-ci](https://travis-ci.com/)

1. 同步Github仓库并选择所需要部署的仓库

![image-20200627105456905](https://pic.tinsfox.com/md/image-20200627105456905.png)

2. 进行仓库设置

   点击仓库右侧的`setting`进入设置页面，设置环境变量，如果是敏感信息如`GH_TOKEN` 不要！不要！！不要！！！勾选`DISPLAY VALUE IN BUILD LOG` 否则会在构建日志中明文显示。其中要注意的是推送到github分支`git push --force --quiet "https://f6bcfdb7xxxxxc3937490f8@github.com/TinsFox/automatic.git" master:gh-pages ` 笔者在这里卡死了两天,其中仓库地址前面是没有`git@`的，一开始误认为是在github上点击`clone`复制的那个地址（~~git@github.com:userNAme/repositoryName.git~~）（😷）

   | 变量名   | 变量示例                         | 说明                                                         |
   | -------- | -------------------------------- | ------------------------------------------------------------ |
   | GH_REF   | github.com/TinsFox/automatic.git | 仓库地址(不能是私有仓库)                                     |
   | GH_TOKEN | F6bcfdb710xxxxxxxf068c1xxxxz     | Github的 [Personal access tokens](https://github.com/settings/tokens) |
   | U_EMAIL  | example@xx.com                   | Git配置的邮箱                                                |
   | USER     | userName                         | Git配置的用户名                                              |

   ![image-20200627105812756](https://pic.tinsfox.com/md/image-20200627105812756.png)

3. 添加`.travis.yml` 文件

   Travis 是根据仓库根目录下的`.travis.yam`文件来进行构建，在里面配置好我们所需要的构建步骤，Travis会根据步骤进行构建

   ```yaml
   language: node_js # 仓库语言
   node_js:
     - 10.16.0 #设定node.js版本
   cache:
     directories:
       - node_modules #缓存目录
   install:
     - npm install  
   before_script:
   
   script:
     - npm run build
   
   after_script:
     - cd ./dist #进入build生成的静态资源目录
     - git init #初始化一个Git repository
     - git config user.name "${USER}" # 配置非全局Git 用户信息
     - git config user.email "${U_EMAIL}"
     - git add . 
     - git commit -m "Travis CI Auto Builder at `date +"%Y-%m-%d %H:%M"`" # 提交记录包含时间
     - git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:deploy # 部署分支
     - git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages # 通过Personal access tokens强制推送到github的一个分支，分支不存在则创建
   branches: #这里设置只有当master分支的代码上发生改变时才会触发构建
     only:
       - master
   
   notifications:
     email: true # 是否开启邮件通知
   ```

4. 配置好上述文件之后，push到github，Travis就会自动执行我们设定的命令，把构建后的文件推送到指导的分支，这里是在脚本里面写死了推送到`deploy`和`gh-pages`分支（分支可以通过变量来指定）。

## 部署

### 方式

1. GitHub Pages、Gitee Pages（这里不详细介绍）

2. [netlify](https://app.netlify.com/)（可能需要科学上网😪）

3. 服务器

   这里会对方式二和方式三进行介绍

   ### netlify

   - 注册。。。(此处省略)

   - 新建网站

     点击`New site from git`，进行授权，选择所要部署的仓库,填写好脚本等信息，确定后就会进行网站构建部署（可以进行自定义域名，开启https等，具体的就Google吧 🙊）***<u>(图中的npm build->npm run build)</u>***

     ![image-20200627113024366](https://pic.tinsfox.com/md/image-20200627113024366.png)

   ![image-20200627113437504](https://pic.tinsfox.com/md/image-20200627113437504.png)

   ### 服务器

   折腾这么久终于来到重头戏了。

   1. 使用 `nginx Apache` 等web服务器，简单步骤为配置虚拟主机->设置根目录指向打包后的`dist` ->重启web服务器->finsh。

   2. 使用`docker`，看下去之前，你应该对`docker`以及`linux`命令有所了解

      - `Dockerfile`

      - ```dockerfile
        FROM node:10
        COPY ./ /app
        WORKDIR /app
        RUN npm install --registry=https://registry.npm.taobao.org && npm run lint -- --fix && npm run build:prod
        
        FROM nginx
        RUN mkdir /app
        COPY --from=0 /app/dist /app
        COPY nginx.conf /etc/nginx/nginx.conf
        ```

      - `nginx.conf`

      - ```nginx
        user  nginx;
        worker_processes  1;
        error_log  /var/log/nginx/error.log warn;
        pid        /var/run/nginx.pid;
        events {
          worker_connections  1024;
        }
        http {
          include /etc/nginx/mime.types;
          default_type  application/octet-stream;
          log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
          '$status $body_bytes_sent "$http_referer" '
          '"$http_user_agent" "$http_x_forwarded_for"';
          access_log  /var/log/nginx/access.log  main;
          sendfile        on;
          keepalive_timeout  65;
          server {
            listen       80;
            server_name  localhost;
            location / {
              root   /app;
              index  index.html;
              try_files $uri $uri/ /index.html;
            }
            error_page   500 502 503 504  /50x.html;
            location = /50x.html {
              root   /usr/share/nginx/html;
            }
          }
        }
        
        ```

      - `docker-compose.yml`

      - ```yaml
        version: '3'
        services:
        
          web:
            build: .
            ports:
             - "5000:80"
        
        ```

      - 

      - 配置`.travis.yml` ，这时候我们需要使用Travis 提供的Docker服务，所以我们要在配置文件中说明

        ```yaml
        sudo: required
        language: node_js
        services:
          - docker
        node_js:
          - 10.16.0
        addons:
          apt:
            packages:
              - sshpass
        
        install:
          - npm install
          - ssh-keyscan ${ip} >> ~/.ssh/known_hosts
        script:
          - npm run build:prod
        after_script:
          - docker build -t automatic:latest .
          - docker login --username=${U_EMAIL} registry.cn-shenzhen.aliyuncs.com --password=${registryp}
          - docker tag room:latest registry.cn-shenzhen.aliyuncs.com/tinsfox-gcu/gcu-automatic:latest
          - docker push registry.cn-shenzhen.aliyuncs.com/tinsfox-gcu/gcu-room:latest
          - cp -r ./src/views/orders/notification ./dist
          - sshpass -p ${pwd} scp -r ./dist ${user}@${ip}:/home/room
          - cd ./dist
          - git init
          - git config user.name "${USER}"
          - git config user.email "${U_EMAIL}"
          - git add .
          - git commit -m "Travis CI Auto Builder at `date +"%Y-%m-%d %H:%M"`" # 提交记录包含时间
          - git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:${branch} # 部署分支
          - sshpass -p ${pwd} ssh -o StrictHostKeyChecking=no ${user}@${ip}  'cd /home/room/classrepair-vue && touch ci.md'
          - sshpass -p ${pwd} ssh -o StrictHostKeyChecking=no ${user}@${ip}  'docker rmi  registry.cn-shenzhen.aliyuncs.com/tinsfox-gcu/gcu-room:latest'
          - sshpass -p ${pwd} ssh -o StrictHostKeyChecking=no ${user}@${ip}  'docker pull  registry.cn-shenzhen.aliyuncs.com/tinsfox-gcu/gcu-room:latest'
          - sshpass -p ${pwd} ssh -o StrictHostKeyChecking=no ${user}@${ip}  'cd docker-compose文件所在目录 && docker-compose up -d && exit'
          - docker logout
        branches:
          only:
            - master
        
        notifications:
          email: true
        
        ```

        

   

