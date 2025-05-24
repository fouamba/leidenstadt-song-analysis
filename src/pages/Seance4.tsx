import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  Award, 
  BookOpen, 
  MessageSquare, 
  PenTool,
  CheckCircle,
  Star,
  Eye,
  Download,
  Share,
  Volume2
} from 'lucide-react';

const Seance4 = () => {
  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>Séance 4</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Contenu pédagogique de la Séance 4 à compléter.</p>
        </CardContent>
      </Card>
    </main>
  );
};

export default Seance4;
