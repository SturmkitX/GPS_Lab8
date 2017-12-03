#version 330 core

layout(location=0) in vec3 vPosition;
layout(location=1) in vec3 vNormal;

out vec3 vertexPosition;
out vec3 vertexNormal;

//matrices
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;
uniform mat3 normalMatrix;

void main()
{
    vertexPosition = vPosition;
    vertexNormal = vNormal;
	gl_Position = projection * view * model * vec4(vPosition, 1.0f);
}
