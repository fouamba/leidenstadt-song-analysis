
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { NavigationBar } from '@/components/NavigationBar';
import { Users, Eye } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Données de démonstration (à remplacer par Supabase)
  const demoCredentials = {
    student: { email: 'eleve@demo.fr', password: 'demo123' },
    teacher: { email: 'prof@demo.fr', password: 'demo123' }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const credentials = demoCredentials[userType];
    
    if (email === credentials.email && password === credentials.password) {
      // Simuler une connexion réussie
      localStorage.setItem('userType', userType);
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
    } else {
      alert('Identifiants incorrects. Utilisez les identifiants de démonstration.');
    }
  };

  const handleDemoLogin = (type: 'student' | 'teacher') => {
    const credentials = demoCredentials[type];
    setEmail(credentials.email);
    setPassword(credentials.password);
    setUserType(type);
  };

  // Redirection après connexion
  if (isLoggedIn) {
    const redirectPath = userType === 'teacher' ? '/teacher' : '/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavigationBar />
      
      <div className="flex-grow flex items-center justify-center py-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Connexion</h1>
            <p className="text-gray-600 mt-2">
              Accédez à votre espace personnel
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Se connecter</CardTitle>
              <CardDescription>
                Choisissez votre profil et connectez-vous à la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={userType} onValueChange={(value) => setUserType(value as 'student' | 'teacher')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="student" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Élève
                  </TabsTrigger>
                  <TabsTrigger value="teacher" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Enseignant
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="student" className="space-y-4 mt-4">
                  <Alert>
                    <AlertDescription>
                      <strong>Démonstration :</strong> Utilisez eleve@demo.fr / demo123
                    </AlertDescription>
                  </Alert>
                </TabsContent>

                <TabsContent value="teacher" className="space-y-4 mt-4">
                  <Alert>
                    <AlertDescription>
                      <strong>Démonstration :</strong> Utilisez prof@demo.fr / demo123
                    </AlertDescription>
                  </Alert>
                </TabsContent>
              </Tabs>

              <form onSubmit={handleLogin} className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Votre mot de passe"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Se connecter
                </Button>
              </form>

              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600 text-center">Connexion rapide (démonstration) :</p>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDemoLogin('student')}
                  >
                    Élève démo
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDemoLogin('teacher')}
                  >
                    Prof démo
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="text-center">
              <p className="text-sm text-gray-500">
                Cette interface sera remplacée par l'authentification Supabase
              </p>
            </CardFooter>
          </Card>

          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-900 mb-2">🚀 Prochaines étapes</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Intégration avec Supabase pour l'authentification</li>
                <li>• Gestion des rôles et permissions</li>
                <li>• Stockage sécurisé des données utilisateur</li>
                <li>• Déploiement sur Vercel</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="bg-slate-900 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">Application éducative basée sur les compétences - "Né en 17 à Leidenstadt"</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
