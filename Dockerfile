FROM node:16.13.1

# package関連のフィアルを確実にimageに追加、npmとかは最初から入ってるっぽい
ADD package.json package-lock.json /
# RUN npm install
