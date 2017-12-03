#version 330 core

out vec4 fColor;

in vec3 vertexPosition;
in vec3 vertexNormal;

//matrices
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;
uniform mat3 normalMatrix;

//lighting
uniform vec3 lightDir;
uniform vec3 lightColor;
uniform vec3 baseColor;

vec3 ambient;
float ambientStrength = 0.2f;
vec3 diffuse;
vec3 specular;
float specularStrength = 0.5f;

vec3 color;

void computeLight()
{
	//compute eye space coordinates
	vec4 vertPosEye = view * model * vec4(vertexPosition, 1.0f);
	vec3 normalEye = normalize(normalMatrix * vertexNormal);

	//normalize light direction
	vec3 lightDirN = normalize(lightDir);

	//compute view direction (in eye coordinates, the viewer is situated at the origin
	vec3 viewDir = normalize(- vertPosEye.xyz);

	//compute ambient light
	ambient = ambientStrength * lightColor;

	//compute diffuse light
	diffuse = max(dot(normalEye, lightDirN), 0.0f) * lightColor;

	//compute specular light
	vec3 reflectDir = reflect(-lightDirN, normalEye);
	float specCoeff = pow(max(dot(viewDir, reflectDir), 0.0f), 32);
	specular = specularStrength * specCoeff * lightColor;
}

void main()
{

	computeLight();

	//compute final vertex color
	color = min((ambient + diffuse) * baseColor + specular, 1.0f);

	fColor = vec4(color, 1.0f);
}
