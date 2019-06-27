FROM amazonlinux

# node
RUN yum -y groupinstall 'Development Tools'
RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
RUN yum -y install nodejs npm

# sharp
RUN npm install --global node-gyp

# serverless
RUN chown -R $USER:$(id -gn $USER) /root/.config
RUN npm install --global serverless@1.42.3

# copy package.json before codebase to cache npm install result
ADD package.json /code/package.json
ADD package-lock.json /code/package-lock.json

# working directory
WORKDIR /code

# install dependencies
RUN npm install --prefer-offline
#    rm -rf node_modules/ \
#    && npm install --prefer-offline \

# Copy project files
ADD . /code
WORKDIR /code
