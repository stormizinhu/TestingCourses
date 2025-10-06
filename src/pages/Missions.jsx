import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const QAMissionLogin = () => {
  const [answers, setAnswers] = useState({
    'lacuna-1': '',
    'lacuna-2': '',
    'lacuna-3': '',
  });
  const [result, setResult] = useState(null); // null, 'success', 'error'

  // Respostas corretas baseadas no HTML fornecido
  const correctAnswers = {
    'lacuna-1': 'id', // input com id="username"
    'lacuna-2': 'css', // input com name="password"
    'lacuna-3': 'css-data', // button com data-action="login"
  };

  const handleOptionChange = (lacunaId, value) => {
    setAnswers(prev => ({ ...prev, [lacunaId]: value }));
  };

  const checkAnswers = () => {
    let allCorrect = true;
    for (const lacunaId in correctAnswers) {
      if (answers[lacunaId] !== correctAnswers[lacunaId]) {
        allCorrect = false;
        break;
      }
    }

    if (allCorrect) {
      setResult('success');
      toast({
        title: "Parabéns!",
        description: "Você completou a missão com sucesso!",
        variant: "default",
      });
    } else {
      setResult('error');
      toast({
        title: "Ops!",
        description: "Algumas respostas estão incorretas. Tente novamente!",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-xl shadow-lg p-6 border"
    >
      <h2 className="text-2xl font-bold mb-4">QA Mission - Complete o código com base na página de login</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Página de Login de exemplo:</h3>
        <div className="bg-muted rounded-lg p-4 flex items-center justify-center h-48 text-muted-foreground">
          <p>
            A página de login possui os seguintes elementos:
            <ul className="list-disc list-inside ml-4 mt-1">
              <li>Campo de usuário: `&lt;input type="text" id="username" placeholder="Usuário" /&gt;`</li>
              <li>Campo de senha: `&lt;input type="password" name="password" placeholder="Senha" /&gt;`</li>
              <li>Botão de login: `&lt;button type="submit" data-action="login"&gt;Entrar&lt;/button&gt;`</li>
            </ul>
          </p>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Analise o HTML acima para escolher o melhor seletor para cada elemento.
        </p>
      </div>

      <div className="font-mono bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-6 text-sm">
        <pre>
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class TesteLogin {"\n"}
    public static void main(String[] args) {"\n"}
        WebDriver driver = new ChromeDriver();{"\n"}
        driver.get("URL_DA_PAGINA");{"\n\n"}
        WebElement campoUsuario = driver.findElement(<span className="text-yellow-400">?</span>);{"\n"}
        campoUsuario.sendKeys("usuario_teste");{"\n\n"}
        WebElement campoSenha = driver.findElement(<span className="text-yellow-400">?</span>);{"\n"}
        campoSenha.sendKeys("senha_teste");{"\n\n"}
        WebElement botaoLogin = driver.findElement(<span className="text-yellow-400">?</span>);{"\n"}
        botaoLogin.click();{"\n\n"}
        driver.quit();{"\n"}
    {"}"}{"\n"}
{"}"}
        </pre>
      </div>

      <div className="space-y-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Lacuna 1 - campoUsuario</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="lacuna-1"
                value="id"
                checked={answers['lacuna-1'] === 'id'}
                onChange={() => handleOptionChange('lacuna-1', 'id')}
                className="form-radio text-primary"
              />
              <span>By.id("username")</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="lacuna-1"
                value="xpath"
                checked={answers['lacuna-1'] === 'xpath'}
                onChange={() => handleOptionChange('lacuna-1', 'xpath')}
                className="form-radio text-primary"
              />
              <span>By.xpath("//input[@name='username']")</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="lacuna-1"
                value="css"
                checked={answers['lacuna-1'] === 'css'}
                onChange={() => handleOptionChange('lacuna-1', 'css')}
                className="form-radio text-primary"
              />
              <span>By.cssSelector("input[name='username']")</span>
            </label>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Lacuna 2 - campoSenha</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="lacuna-2"
                value="id"
                checked={answers['lacuna-2'] === 'id'}
                onChange={() => handleOptionChange('lacuna-2', 'id')}
                className="form-radio text-primary"
              />
              <span>By.id("password")</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="lacuna-2"
                value="xpath"
                checked={answers['lacuna-2'] === 'xpath'}
                onChange={() => handleOptionChange('lacuna-2', 'xpath')}
                className="form-radio text-primary"
              />
              <span>By.xpath("//input[@name='password']")</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="lacuna-2"
                value="css"
                checked={answers['lacuna-2'] === 'css'}
                onChange={() => handleOptionChange('lacuna-2', 'css')}
                className="form-radio text-primary"
              />
              <span>By.cssSelector("input[name='password']")</span>
            </label>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Lacuna 3 - botaoLogin</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="lacuna-3"
                value="id"
                checked={answers['lacuna-3'] === 'id'}
                onChange={() => handleOptionChange('lacuna-3', 'id')}
                className="form-radio text-primary"
              />
              <span>By.id("loginBtn")</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="lacuna-3"
                value="xpath"
                checked={answers['lacuna-3'] === 'xpath'}
                onChange={() => handleOptionChange('lacuna-3', 'xpath')}
                className="form-radio text-primary"
              />
              <span>By.xpath("//button[@id='loginBtn']")</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="lacuna-3"
                value="css-data"
                checked={answers['lacuna-3'] === 'css-data'}
                onChange={() => handleOptionChange('lacuna-3', 'css-data')}
                className="form-radio text-primary"
              />
              <span>By.cssSelector("button[data-action='login']")</span>
            </label>
          </div>
        </div>
      </div>

      <Button onClick={checkAnswers} className="w-full">
        Conferir
      </Button>

      {result === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg flex items-center space-x-2"
        >
          <CheckCircle className="h-5 w-5" />
          <span>Todas as respostas estão corretas! Excelente trabalho!</span>
        </motion.div>
      )}

      {result === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-lg flex items-center space-x-2"
        >
          <XCircle className="h-5 w-5" />
          <span>Algumas respostas estão incorretas. Revise e tente novamente!</span>
        </motion.div>
      )}
    </motion.div>
  );
};

const Missions = () => {
  return (
    <>
      <Helmet>
        <title>Missões - Testing Courses</title>
        <meta name="description" content="Participe de missões práticas e desafios para aprimorar suas habilidades em testes de software." />
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Missões Práticas</h1>
          <p className="text-muted-foreground">
            Coloque seus conhecimentos à prova com desafios reais de QA.
          </p>
        </div>

        <QAMissionLogin />

        {/* Placeholder for other missions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-xl shadow-lg p-6 border text-center text-muted-foreground"
        >
          <p>🚧 Novas missões em breve! Fique ligado para mais desafios emocionantes! 🚀</p>
        </motion.div>
      </div>
    </>
  );
};

export default Missions;